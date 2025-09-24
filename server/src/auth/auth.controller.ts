import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Post, Body, Get, Req } from '@nestjs/common';
import { RegisterRequestDto } from './dto/register.request.dto';
import { AuthResponseDto } from './dto/auth.response.dto';
import { AuthGuard } from './auth.guard';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';
import { UserResponseDto } from './dto/auth.response.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiCreatedResponse({
    description: 'New user successfully created',
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @ApiConflictResponse({
    description: 'Registration failed: email already in use',
  })
  @Post('register')
  async register(@Body() registerRequest: RegisterRequestDto): Promise<AuthResponseDto> {
    return await this.authService.register(registerRequest);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    description: 'New user successfully logged in',
    type: AuthResponseDto,
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
  ): Promise<AuthResponseDto> {
    return await this.authService.login(loginRequest);
  }

  @ApiOperation({ summary: 'Get current user' })
  @ApiOkResponse({
    description: 'Returns the current authenticated user',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req: AuthenticatedRequest): Promise<UserResponseDto> {
    const userId = req.user.sub;

    return await this.authService.findUserById(userId);
  }
}
