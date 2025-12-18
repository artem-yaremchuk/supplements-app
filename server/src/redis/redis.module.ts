import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { REDIS } from '../constants/redis-constants';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: REDIS,
      useFactory: async (configService: ConfigService) => {
        const client = createClient({
          url: configService.getOrThrow<string>('REDIS_URL'),
        });

        await client.connect();

        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
