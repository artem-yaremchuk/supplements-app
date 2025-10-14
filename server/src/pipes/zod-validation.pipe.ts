import { PipeTransform, Logger, BadRequestException } from '@nestjs/common';
import { ZodType, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  private readonly logger = new Logger(ZodValidationPipe.name);

  constructor(private readonly schema: ZodType) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        this.logger.warn('Validation failed');
        throw new BadRequestException({
          message: 'Validation failed',
          errors: error.issues.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
          })),
        });
      }

      this.logger.warn('Validation failed');
      throw new BadRequestException('Validation failed');
    }
  }
}
