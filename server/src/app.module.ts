import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SupplementModule } from './supplement/supplement.module';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GqlOptionalAuthRequest } from './auth/interfaces/authenticated-request.interface';
import { RedisModule } from './redis/redis.module';
import { PrometheusModule } from './monitoring/prometheus.module';
import { EventBusModule } from './event/event-bus.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env.production.local', '.env.development.local', '.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
      context: ({ req }: { req: GqlOptionalAuthRequest }) => ({ req }),
    }),
    PrismaModule,
    AuthModule,
    SupplementModule,
    UserModule,
    RedisModule,
    PrometheusModule,
    EventBusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
