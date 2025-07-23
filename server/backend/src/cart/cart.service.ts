import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartItem } from './models/cart-item.model';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId: number): Promise<CartItem[]> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) return [];

    return this.prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: {
        product: true, // включаємо зв’язаний товар
      },
    });
  }

  async addToCart(userId: number, productId: number, quantity: number): Promise<CartItem> {
    // Створити кошик, якщо не існує
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    // Додати або оновити товар у кошику
    const cartItem = await this.prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        cartId: cart.id,
        productId,
        quantity,
      },
      include: {
        product: true, 
      },
    });

    return cartItem;
  }

  async removeFromCart(userId: number, productId: number): Promise<void> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) return;

    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId,
      },
    });
  }
}
