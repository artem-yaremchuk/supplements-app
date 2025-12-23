import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrometheusController } from './prometheus.controller';
import { PrometheusService } from './prometheus.service';
import { MetricsMiddleware } from './middlewares/metrics.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PrometheusController],
  providers: [PrometheusService],
  exports: [PrometheusService],
  imports: [AuthModule],
})
export class PrometheusModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
