import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}

  async getAverageRating(productId: number) {
    const result = await this.prisma.rating.aggregate({
      where: { productId },
      _avg: { rate: true },
      _count: true,
    });

    return {
      average: result._avg.rate ?? 0,
      count: result._count,
    };
  }

  async createOrUpdateRating(userId: number, productId: number, rate: number) {
    return this.prisma.rating.upsert({
      where: { userId_productId: { userId, productId } },
      update: { rate },
      create: { userId, productId, rate },
      include: {
        user: true,
        product: true
      },
    });
  }

  async getUserRating(userId: number, productId: number) {
    return this.prisma.rating.findUnique({
      where: { userId_productId: { userId, productId } },
    });
  }
}
