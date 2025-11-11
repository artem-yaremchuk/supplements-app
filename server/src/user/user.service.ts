import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async toogleFavorite(userId: string, supplementId: string): Promise<{ message: string }> {
    const supplement = await this.prisma.supplement.findUnique({
      where: { id: supplementId },
    });

    if (!supplement) {
      this.logger.warn(`Supplement with ID '${supplementId}' not found`);
      throw new NotFoundException('Supplement not found');
    }

    const isFavorite = await this.prisma.user.findFirst({
      where: {
        id: userId,
        favorites: {
          some: { id: supplementId },
        },
      },
    });

    if (isFavorite) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          favorites: {
            disconnect: { id: supplementId },
          },
        },
      });

      this.logger.log(
        `Supplement '${supplementId}' successfully removed from user '${userId}' favorites`,
      );
      return { message: 'Supplement successfully removed from favorites' };
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          connect: { id: supplementId },
        },
      },
    });

    this.logger.log(
      `Supplement '${supplementId}' successfully added to user '${userId}' favorites`,
    );
    return { message: 'Supplement successfully added to favorites' };
  }
}
