import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '@prisma/client';
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

  async findByStatuses(statuses: OrderStatus[]): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: {
        status: {
          in: statuses,
        },
      },
      include: {
        product: true,
        user: true,
      },
    });
  }
  async findById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        product: true,
      },
    });
  }
}
