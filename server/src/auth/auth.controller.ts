import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Req,
  HttpCode,
  HttpStatus,
  Res,
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
  ApiHeader,
} from '@nestjs/swagger';
import { RegisterRequestDto } from './dto/register-request.dto';
import { AuthResponse } from './dto/auth-response';
import { AuthGuard } from './auth.guard';
import {
  AuthenticatedRequest,
  GoogleCallbackRequest,
} from './interfaces/authenticated-request.interface';
import { UserResponse } from './dto/auth-response';
import { GoogleAuthGuard } from './google-auth.guard';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

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
    description: 'User successfully logged in',
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
  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req: AuthenticatedRequest): Promise<UserResponse> {
    const userId = req.user.sub;

    return await this.authService.findUserById(userId);
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  @ApiNoContentResponse({
    description: 'User successfully logged out',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout(@Req() req: AuthenticatedRequest): Promise<void> {
    const userId = req.user.sub;

    await this.authService.logout(userId);
  }

  @ApiOperation({
    summary: 'Redirect user to Google OAuth consent screen',
    description:
      'This endpoint uses Passport Google Strategy to redirect user to Google OAuth consent screen',
  })
  @ApiOkResponse({ description: 'User successfully redirected to Google OAuth consent screen' })
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @ApiOperation({
    summary: 'Google OAuth callback',
    description:
      'Google redirects back to this endpoint. Generates temporary single-use google auth code and redirects user back to the frontend.',
  })
  @ApiOkResponse({
    description: 'Google auth code successfully generated and sent',
  })
  @ApiUnauthorizedResponse({
    description: 'This Google account cannot be used for login. Please try another account.',
  })
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Req() req: GoogleCallbackRequest, @Res() res: Response) {
    const { googleAuthCode } = req.user;

    const frontendUrl = this.configService.getOrThrow<string>('FRONTEND_URL');

    return res.redirect(`${frontendUrl}/google-success?code=${googleAuthCode}`);
  }

  @ApiOperation({ summary: 'Verify Google auth code' })
  @ApiOkResponse({
    description: 'User successfully logged in with Google',
    type: AuthResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid Google auth code' })
  @ApiUnauthorizedResponse({ description: 'Google auth code expired' })
  @Post('google-verify')
  async googleVerify(@Body('code') code: string): Promise<AuthResponse> {
    return await this.authService.verifyGoogleAuthCode(code);
  }
}
