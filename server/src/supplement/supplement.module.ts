import { Module } from '@nestjs/common';
import { SupplementController } from './supplement.controller';
import { SupplementService } from './supplement.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { SupplementGateway } from './supplement.gateway';
import { SupplementResolver } from './supplement.resolver';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [PrismaModule, AuthModule, RedisModule],
  controllers: [SupplementController],
  providers: [SupplementService, SupplementGateway, SupplementResolver],
})
export class SupplementModule {}
