import { Module } from '@nestjs/common';
import { SupplementController } from './supplement.controller';
import { SupplementService } from './supplement.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SupplementController],
  providers: [SupplementService],
})
export class SupplementModule {}
