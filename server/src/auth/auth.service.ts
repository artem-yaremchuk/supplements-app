import {
  Logger,
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from './dto/register-request.dto';
import { AuthResponse } from './dto/auth-response';
import { UserResponse } from './dto/auth-response';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { OutboxEventType } from '../generated/prisma/enums';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(registerRequest: RegisterRequestDto): Promise<AuthResponse> {
    const maskedEmail = registerRequest.email.replace(/(^[^@]?)[^@]*(@.*$)/, '$1***$2');
    this.logger.log(`Registration attempt for email: ${maskedEmail}`);

    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerRequest.email },
    });

    if (existingUser) {
      this.logger.warn(`Registration failed: ${maskedEmail} already in use`);
      throw new ConflictException('Registration failed. Email already in use');
    }

    const hashedPassword = await bcrypt.hash(registerRequest.password, 10);

    const user = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: registerRequest.name,
          email: registerRequest.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      await tx.outboxEvent.create({
        data: {
          type: OutboxEventType.USER_REGISTERED,
          payload: {
            userId: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });

      return user;
    });

    const { role, ...userData } = user;

    const payload = {
      sub: user.id,
      role,
    };

    const access_token = await this.jwtService.signAsync(payload);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { token: access_token },
    });

    this.logger.log(`User '${user.id}' successfully signed up`);

    return { user: userData, access_token };
  }

  async login(loginRequest: Pick<RegisterRequestDto, 'email' | 'password'>): Promise<AuthResponse> {
    const maskedEmail = loginRequest.email.replace(/(^[^@]?)[^@]*(@.*$)/, '$1***$2');
    this.logger.log(`Login attempt for email: ${maskedEmail}`);

    const user = await this.prisma.user.findUnique({
      where: { email: loginRequest.email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!user) {
      this.logger.warn(`Login failed. User not found for email '${maskedEmail}'`);
      throw new NotFoundException('User not found');
    }

    const { role, password, ...userData } = user;

    if (!password) {
      this.logger.warn(
        `Login failed. User '${maskedEmail}' is registered via Google OAuth and has no password`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    const compare = await bcrypt.compare(loginRequest.password, password);

    if (!compare) {
      this.logger.warn(`Login failed. Invalid credentials for email: ${maskedEmail}.`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      role,
    };

    const access_token = await this.jwtService.signAsync(payload);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { token: access_token, lastLogin: new Date() },
    });

    this.logger.log(`User '${user.id}' successfully logged in`);

    return { user: userData, access_token };
  }

  async findUserById(userId: string): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      this.logger.warn(`User '${userId}' not found`);
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async logout(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { token: null },
    });

    this.logger.log(`User '${userId}' successfully logged out`);
  }

  async validateGoogleUser(googleProfile: {
    googleId: string;
    email: string;
    name: string;
  }): Promise<{ googleAuthCode: string }> {
    const { googleId, email, name } = googleProfile;

    const maskedEmail = email.replace(/(^[^@]?)[^@]*(@.*$)/, '$1***$2');
    this.logger.log(`Google login attempt for email: ${maskedEmail}`);

    // Try to find user by googleId
    // googleId is the primary identity for a Google account
    let user = await this.prisma.user.findUnique({
      where: { googleId },
    });

    if (user) {
      // User already logged in with Google before
      // Just refresh auth code and lastLogin
      const { googleAuthCode, googleAuthExp } = this.generateGoogleAuthCode();

      await this.prisma.user.update({
        where: { googleId },
        data: { googleAuthCode, googleAuthExp, lastLogin: new Date() },
      });

      return { googleAuthCode };
    }

    // If googleId not found — try to find user by email
    // Scenario:
    // user registered earlier via email/password
    // and now logs in with Google for the first time
    user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const { googleAuthCode, googleAuthExp } = this.generateGoogleAuthCode();

      // Link Google account to existing user
      await this.prisma.user.update({
        where: { id: user.id },
        data: { googleId, googleAuthCode, googleAuthExp, lastLogin: new Date() },
      });

      return { googleAuthCode };
    }

    // If neither googleId nor email exists - this is a completely new user
    // Inside transaction:
    // create user
    // write USER_REGISTERED event to outbox
    const newUser = await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          googleId,
          name,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      await tx.outboxEvent.create({
        data: {
          type: OutboxEventType.USER_REGISTERED,
          payload: {
            userId: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
        },
      });

      return newUser;
    });

    const { googleAuthCode, googleAuthExp } = this.generateGoogleAuthCode();

    await this.prisma.user.update({
      where: { id: newUser.id },
      data: { googleAuthCode, googleAuthExp },
    });

    return { googleAuthCode };
  }

  private generateGoogleAuthCode() {
    const googleAuthCode = crypto.randomUUID();
    const googleAuthExp = new Date(Date.now() + 60 * 1000);

    return { googleAuthCode, googleAuthExp };
  }

  async verifyGoogleAuthCode(code: string): Promise<AuthResponse> {
    const user = await this.prisma.user.findFirst({
      where: { googleAuthCode: code },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        googleAuthExp: true,
      },
    });

    if (!user) {
      this.logger.warn('Invalid Google auth code');
      throw new BadRequestException('Invalid Google auth code');
    }

    const { role, googleAuthExp, ...userData } = user;

    if (!googleAuthExp || googleAuthExp < new Date()) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          googleAuthCode: null,
          googleAuthExp: null,
        },
      });

      this.logger.warn(`Google auth code expired for user '${user.id}'`);
      throw new UnauthorizedException('Google auth code expired');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        googleAuthCode: null,
        googleAuthExp: null,
      },
    });

    const payload = { sub: user.id, role };
    const access_token = await this.jwtService.signAsync(payload);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { token: access_token, lastLogin: new Date() },
    });

    this.logger.log(`User '${user.id}' successfully logged in with Google`);

    return { user: userData, access_token };
  }
}
