import {
  Controller,
  UseGuards,
  UsePipes,
  Post,
  Body,
  Get,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
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
import { RegisterRequestDto } from './dto/register.request.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { AuthResponseDto } from './dto/auth.response.dto';
import { AuthGuard } from './auth.guard';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';
import { UserResponseDto } from './dto/auth.response.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { registerSchema, loginSchema } from './schemas/authSchema';

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
    description: 'Registration failed. Email already in use',
  })
  @Post('register')
  @UsePipes(new ZodValidationPipe(registerSchema))
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
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() loginRequest: LoginRequestDto): Promise<AuthResponseDto> {
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
