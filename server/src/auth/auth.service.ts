import {
  UnauthorizedException,
  NotFoundException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from './dto/register.request.dto';
import { AuthResponseDto } from './dto/auth.response.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  public async register(registerRequest: RegisterRequestDto): Promise<AuthResponseDto> {
    const maskedEmail = registerRequest.email.replace(/(^[^@]?)[^@]*(@.*$)/, '$1***$2');
    this.logger.log(`Registration attempt for email: ${maskedEmail}`);

    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerRequest.email },
    });

    if (existingUser) {
      this.logger.warn(`Registration failed: ${maskedEmail} already in use`);
      throw new ConflictException(`Registration failed: ${registerRequest.email} already in use`);
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

    this.logger.log(`User '${user.id}' successfully signed up`);

    const payload = {
      sub: user.id,
      role: user.role,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return { user, access_token };
  }

  public async login(
    loginRequest: Pick<RegisterRequestDto, 'email' | 'password'>,
  ): Promise<AuthResponseDto> {
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
      this.logger.warn(`Login failed: user not found for email: ${maskedEmail}`);
      throw new NotFoundException('User not found');
    }

    const compare = await bcrypt.compare(loginRequest.password, user.password);

    if (!compare) {
      this.logger.warn(`Login failed: invalid credentials for email: ${maskedEmail}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    this.logger.log(`User '${user.id}' successfully logged in`);

    const payload = {
      sub: user.id,
      role: user.role,
    };

    const access_token = await this.jwtService.signAsync(payload);

    const safeUser: Omit<typeof user, 'password'> = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return { user: safeUser, access_token };
  }
}
