import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { OutboxEventType, OutboxStatus } from '../generated/prisma/enums';
import { UserRegisteredHandler } from './handlers/user-registered.handler';
import { UserRegisteredPayload } from './interfaces/user-registered.interface';

@Injectable()
export class OutboxEventProcessor {
  private readonly logger = new Logger(OutboxEventProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly userRegisteredHandler: UserRegisteredHandler,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async process() {
    const events = await this.prisma.outboxEvent.findMany({
      where: { status: OutboxStatus.PENDING },
      take: 10,
    });

    if (events.length === 0) {
      return;
    }

    this.logger.log(`Processing ${events.length} outbox events`);

    for (const event of events) {
      try {
        switch (event.type) {
          case OutboxEventType.USER_REGISTERED: {
            const payload = event.payload as unknown as UserRegisteredPayload;

            await this.userRegisteredHandler.handle(payload);
            break;
          }

          default:
            this.logger.log('Invalid outbox event type');
        }

        await this.prisma.outboxEvent.update({
          where: { id: event.id },
          data: {
            status: OutboxStatus.PROCESSED,
            processedAt: new Date(),
          },
        });
      } catch (error) {
        this.logger.error(`Failed to process outbox event ${event.id}`, error);
      }
    }
  }
}
