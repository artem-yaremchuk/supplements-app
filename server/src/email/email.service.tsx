import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { SendEmailPayload } from './interfaces/send-email.interface';
import { convert } from 'html-to-text';
import { render } from '@react-email/render';
import WelcomeEmail from './templates/WelcomeEmail';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly emailFrom: string;
  private readonly frontendUrl: string;
  private readonly resend: Resend;

  constructor(private readonly configService: ConfigService) {
    const resendApiKey = this.configService.getOrThrow<string>('RESEND_API_KEY');
    this.resend = new Resend(resendApiKey);

    this.emailFrom = this.configService.getOrThrow<string>('EMAIL_FROM');

    this.frontendUrl = this.configService.getOrThrow<string>('FRONTEND_URL');
  }

  async send(payload: SendEmailPayload): Promise<void> {
    const { data, error } = await this.resend.emails.send(payload);

    if (error) {
      this.logger.error(`Failed to send email to ${payload.to}`, error);
      throw new Error(`Resend API error: ${error.message || 'Unknown error'}`);
    }

    this.logger.log(`Email successfully sent to ${payload.to} with ID: ${data?.id}`);
  }

  async sendWelcomeEmail({ to, name }: { to: string; name: string }) {
    const html = await render(<WelcomeEmail name={name} frontendUrl={this.frontendUrl} />);
    const text = convert(html);

    await this.send({
      to,
      from: this.emailFrom,
      subject: 'Welcome to Supplements App!',
      text,
      html,
    });
  }
}
