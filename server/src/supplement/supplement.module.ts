import { Module } from '@nestjs/common';
import { SupplementController } from './supplement.controller';
import { SupplementService } from './supplement.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { SupplementGateway } from './supplement.gateway';
import { SupplementResolver } from './supplement.resolver';
import { RedisModule } from '../redis/redis.module';
import { PrometheusModule } from '../monitoring/prometheus.module';
import { UpdateLiveViewersHandler } from './domain/handlers/update-live-viewers.handler';
import { LogSupplementEventsHandler } from './domain/handlers/log-supplement-events.handler';

@Module({
  imports: [PrismaModule, AuthModule, RedisModule, PrometheusModule],
  controllers: [SupplementController],
  providers: [
    SupplementService,
    SupplementGateway,
    SupplementResolver,
    UpdateLiveViewersHandler,
    LogSupplementEventsHandler,
  ],
})
export class SupplementModule {}
