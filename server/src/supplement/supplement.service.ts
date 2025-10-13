import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SupplementResponseDto } from './dto/supplement-response.dto';

@Injectable()
export class SupplementService {
  private readonly logger = new Logger(SupplementService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<SupplementResponseDto[]> {
    const supplements = await this.prisma.supplement.findMany();

    if (!supplements) {
      this.logger.warn('No supplements found');
      throw new NotFoundException('No supplements found');
    }

    return supplements;
  }

  async findOne(supplementId: string): Promise<SupplementResponseDto> {
    const supplement = await this.prisma.supplement.findUnique({
      where: { id: supplementId },
    });

    if (!supplement) {
      this.logger.warn(`Supplement with ID '${supplementId}' not found`);
      throw new NotFoundException('Supplement not found');
    }

    return supplement;
  }
}
