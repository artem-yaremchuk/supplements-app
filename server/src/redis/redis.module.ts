import { Logger, Module } from '@nestjs/common';
import { createClient } from 'redis';
import { REDIS } from '../constants/redis.constants';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: REDIS,
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger(REDIS);

        const client = createClient({
          url: configService.getOrThrow<string>('REDIS_URL'),
          socket: {
            keepAlive: true,
            keepAliveInitialDelay: 5000,
            reconnectStrategy: (retries) => {
              if (retries > 20) {
                return new Error('Redis reconnect retries exceeded');
              }
              return Math.min(retries * 100, 2000);
            },
          },
        });

        client.on('error', (err: unknown) => {
          if (err instanceof Error) {
            logger.warn(`Redis error: ${err.message}`);
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
