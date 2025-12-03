import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Strategy, Profile, StrategyOptions } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
      scope: ['openid', 'email', 'profile'],
    } as StrategyOptions);
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    const email = profile.emails?.[0]?.value;

    if (!email) {
      this.logger.error('Google did not provide an email address for this account');
      throw new UnauthorizedException(
        'This Google account cannot be used for login. Please try another account.',
      );
    }

    const googleUser = {
      googleId: profile.id,
      email,
      name: profile.displayName ?? 'Unknown Google User',
    };

    return await this.authService.validateGoogleUser(googleUser);
  }
}
