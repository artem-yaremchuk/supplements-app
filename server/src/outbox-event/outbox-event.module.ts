import { Module } from '@nestjs/common';
import { OutboxEventProcessor } from './outbox-event.processor';
import { UserRegisteredHandler } from './handlers/user-registered.handler';
import { EmailModule } from '../email/email.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [OutboxEventProcessor, UserRegisteredHandler],
  imports: [PrismaModule, EmailModule],
})
export class OutboxEventModule {}
