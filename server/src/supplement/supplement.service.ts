import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SupplementResponse } from './dto/supplement-response';

@Injectable()
export class SupplementService {
  private readonly logger = new Logger(SupplementService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId?: string): Promise<SupplementResponse[]> {
    const supplements = await this.prisma.supplement.findMany();

    if (!supplements) {
      this.logger.warn('No supplements found');
      throw new NotFoundException('No supplements found');
    }

    if (!userId) {
      return supplements.map((s) => ({ ...s, isFavorite: false }));
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: { select: { id: true } } },
    });

    const favoriteIds: string[] = user?.favorites.map((f) => f.id) ?? [];

    return supplements.map((s) => ({
      ...s,
      isFavorite: favoriteIds.includes(s.id),
    }));
  }

  async findOne(supplementId: string, userId?: string): Promise<SupplementResponse> {
    const supplement = await this.prisma.supplement.findUnique({
      where: { id: supplementId },
    });

    if (!supplement) {
      this.logger.warn(`Supplement with ID '${supplementId}' not found`);
      throw new NotFoundException('Supplement not found');
    }

    if (!userId) {
      return { ...supplement, isFavorite: false };
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: { select: { id: true } } },
    });

    const favoriteIds: string[] = user?.favorites.map((f) => f.id) ?? [];

    return { ...supplement, isFavorite: favoriteIds.includes(supplementId) };
  }
}
