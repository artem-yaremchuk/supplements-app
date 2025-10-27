import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SupplementModule } from './supplement/supplement.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env.production.local', '.env.development.local', '.env'],
    }),
    PrismaModule,
    AuthModule,
    SupplementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
