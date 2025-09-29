import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SupplementModule } from './supplement/supplement.module';

@Module({
  imports: [PrismaModule, AuthModule, SupplementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
