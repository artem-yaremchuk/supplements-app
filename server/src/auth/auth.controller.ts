import { Controller } from '@nestjs/common';
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
} from '@nestjs/swagger';
import { Post, Body } from '@nestjs/common';
import { RegisterRequestDto } from './dto/register.request.dto';
import { AuthResponseDto } from './dto/auth.response.dto';

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
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @Post('login')
  async login(
    @Body() loginRequest: Pick<RegisterRequestDto, 'email' | 'password'>,
  ): Promise<AuthResponseDto> {
    return await this.authService.login(loginRequest);
  }
}
