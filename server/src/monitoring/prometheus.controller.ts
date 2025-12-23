import { Controller, Get } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('metrics')
export class PrometheusController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @ApiExcludeEndpoint()
  @Get()
  async getMetrics(): Promise<string> {
    return await this.prometheusService.getMetrics();
  }
}
