import { Injectable } from '@nestjs/common';
import { Registry, collectDefaultMetrics, Counter, Histogram } from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly registry: Registry;

  public readonly httpRequestsTotal: Counter<string>;
  public readonly httpRequestDuration: Histogram<string>;
  public readonly cacheHit: Counter<string>;
  public readonly cacheMiss: Counter<string>;

  constructor() {
    this.registry = new Registry();

    collectDefaultMetrics({
      register: this.registry,
    });

    this.httpRequestsTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
    });

    this.registry.registerMetric(this.httpRequestsTotal);

    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'HTTP request latency',
      labelNames: ['method', 'route', 'status'],
      buckets: [0.05, 0.1, 0.2, 0.5, 1, 2, 5],
    });

    this.registry.registerMetric(this.httpRequestDuration);

    this.cacheHit = new Counter({
      name: 'supplements_cache_hit_total',
      help: 'Supplements cache hits',
    });

    this.registry.registerMetric(this.cacheHit);

    this.cacheMiss = new Counter({
      name: 'supplements_cache_miss_total',
      help: 'Supplements cache misses',
    });

    this.registry.registerMetric(this.cacheMiss);
  }

  async getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}
