import { Logger, Module } from '@nestjs/common';
import { createClient } from 'redis';
import { REDIS } from '../constants/redis-constants';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: REDIS,
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger(REDIS);

        const client = createClient({
          url: configService.getOrThrow<string>('REDIS_URL'),
        });

        client.on('error', (err: unknown) => {
          if (err instanceof Error) {
            logger.error(err.message, err.stack);
          } else {
            logger.error('Unknown Redis error');
          }
        });

        await client.connect();

        logger.log('Redis client connected');

        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
