import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { OutboxEventType, OutboxStatus } from '../generated/prisma/enums';

@Injectable()
export class OutboxEventProcessor {
  private readonly logger = new Logger(OutboxEventProcessor.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async process() {
    const events = await this.prisma.outboxEvent.findMany({
      where: { status: OutboxStatus.PENDING },
      take: 10,
    });

    for (const event of events) {
      try {
        switch (event.type) {
          case OutboxEventType.USER_REGISTERED:
            // TO DO email handler
            break;
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
