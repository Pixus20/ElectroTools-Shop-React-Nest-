import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderInput } from './dto/create-order.input';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(input: CreateOrderInput, userId: number) {
    try {
      await this.prisma.order.create({
        data: {
          userId,
          productId: input.productId,
          amount: input.amount,
          quantity: input.quantity,
          orderId: input.orderId,
          liqpayData: input.liqpayData,
          liqpaySignature: input.liqpaySignature,
        },
      });

      return { success: true };
    } catch (e) {
      return { success: false, message: 'Помилка при створенні замовлення' };
    }
  }
}
