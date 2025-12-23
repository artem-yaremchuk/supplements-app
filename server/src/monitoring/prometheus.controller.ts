import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { MetricsAuthGuard } from '../auth/metrics-auth.guard';

@UseGuards(MetricsAuthGuard)
@Controller('metrics')
export class PrometheusController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @ApiExcludeEndpoint()
  @Get()
  async getMetrics(): Promise<string> {
    return await this.prometheusService.getMetrics();
  }
}
