import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrometheusService } from '../prometheus.service';
import { normalizeRoute } from '../utils/normalize-route.util';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly prometheus: PrometheusService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime.bigint();

    res.on('finish', () => {
      const durationNs = process.hrtime.bigint() - start;
      const durationSec = Number(durationNs) / 1e9;

      const rawRoute = req.baseUrl + req.path;
      const route = normalizeRoute(rawRoute);

      this.prometheus.httpRequestsTotal.inc({
        method: req.method,
        route,
        status: String(res.statusCode),
      });

      this.prometheus.httpRequestDuration.observe(
        {
          method: req.method,
          route,
          status: String(res.statusCode),
        },
        durationSec,
      );
    });

    next();
  }
}
