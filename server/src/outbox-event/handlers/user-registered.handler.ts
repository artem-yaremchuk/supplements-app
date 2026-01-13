import { Injectable } from '@nestjs/common';
import { EmailService } from '../../email/email.service';
import { UserRegisteredPayload } from '../interfaces/user-registered.interface';

@Injectable()
export class UserRegisteredHandler {
  constructor(private readonly emailService: EmailService) {}

  async handle(payload: UserRegisteredPayload) {
    await this.emailService.sendWelcomeEmail({
      to: payload.email,
      name: payload.name,
    });
  }
}
