import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CartService } from './cart.service';
import { CartItem } from './models/cart-item.model';

@Resolver(() => CartItem)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  // Отримати всі товари в кошику користувача
  @Query(() => [CartItem], { name: 'cartItems' })
  @UseGuards(GqlAuthGuard)
  async getCartItems(@Context() context: any): Promise<CartItem[]> {
    const userId = context.req.user.id;
    return this.cartService.getCart(userId);
  }

  // Додати товар у кошик
  @Mutation(() => CartItem)
  @UseGuards(GqlAuthGuard)
  async addToCart(
    @Args('productId', { type: () => Int }) productId: number,
    @Args('quantity', { type: () => Int }) quantity: number,
    @Context() context: any,
  ): Promise<CartItem> {
    const userId = context.req.user.id;
    return this.cartService.addToCart(userId, productId, quantity);
  }

  // Видалити товар із кошика
  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async removeFromCart(
    @Args('productId', { type: () => Int }) productId: number,
    @Context() context: any,
  ): Promise<boolean> {
    const userId = context.req.user.id;
    await this.cartService.removeFromCart(userId, productId);
    return true;
  }

  @Mutation(() => CartItem)
@UseGuards(GqlAuthGuard)
async updateCartQuantity(
  @Args('productId', { type: () => Int }) productId: number,
  @Args('quantity', { type: () => Int }) quantity: number,
  @Context() context: any,
): Promise<CartItem> {
  const userId = context.req.user.id;
  return this.cartService.updateQuantity(userId, productId, quantity);
}

@Mutation(() => Boolean)
@UseGuards(GqlAuthGuard)
async clearCart(@Context() context: any): Promise<boolean> {
  const userId = context.req.user.id;
  await this.cartService.clearCart(userId);
  return true;
}



}


