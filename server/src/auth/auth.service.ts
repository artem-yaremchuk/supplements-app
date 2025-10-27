import {
  Logger,
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from './dto/register-request.dto';
import { AuthResponse } from './dto/auth-response';
import { UserResponse } from './dto/auth-response';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  public async register(registerRequest: RegisterRequestDto): Promise<AuthResponse> {
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

    const user = await this.prisma.user.create({
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

  public async login(
    loginRequest: Pick<RegisterRequestDto, 'email' | 'password'>,
  ): Promise<AuthResponse> {
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

    const compare = await bcrypt.compare(loginRequest.password, password);

    if (!compare) {
      this.logger.warn(`Login failed: invalid credentials for email: ${maskedEmail}`);
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
}
