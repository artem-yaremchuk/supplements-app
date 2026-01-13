export interface SendEmailPayload {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}
