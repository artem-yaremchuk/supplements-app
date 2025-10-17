import { Controller, UseGuards, Post, Body, Get, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RegisterRequestDto } from './dto/register-request.dto';
import { AuthResponse } from './dto/auth-response';
import { AuthGuard } from './auth.guard';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';
import { UserResponse } from './dto/auth-response';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiCreatedResponse({
    description: 'New user successfully created',
    type: AuthResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @ApiConflictResponse({
    description: 'Registration failed: email already in use',
  })
  @Post('register')
  async register(@Body() registerRequest: RegisterRequestDto): Promise<AuthResponse> {
    return await this.authService.register(registerRequest);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    description: 'New user successfully logged in',
    type: AuthResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Post('login')
  async login(
    @Body() loginRequest: Pick<RegisterRequestDto, 'email' | 'password'>,
  ): Promise<AuthResponse> {
    return await this.authService.login(loginRequest);
  }

  @ApiOperation({ summary: 'Get current user' })
  @ApiOkResponse({
    description: 'Returns the current authenticated user',
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req: AuthenticatedRequest): Promise<UserResponse> {
    const userId = req.user.sub;

    return await this.authService.findUserById(userId);
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiNoContentResponse({
    description: 'User successfully logged out',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout(@Req() req: AuthenticatedRequest): Promise<void> {
    const userId = req.user.sub;

    await this.authService.logout(userId);
  }
}
