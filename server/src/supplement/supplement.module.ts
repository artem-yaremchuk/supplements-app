import { Module } from '@nestjs/common';
import { SupplementController } from './supplement.controller';
import { SupplementService } from './supplement.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { SupplementGateway } from './supplement.gateway';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [SupplementController],
  providers: [SupplementService, SupplementGateway],
})
export class SupplementModule {}
