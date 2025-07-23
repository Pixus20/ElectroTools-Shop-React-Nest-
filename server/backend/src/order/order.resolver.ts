import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CreateOrderInput } from './dto/create-order.input';
import { CreateOrderOutput } from './dto/create-order.output';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CreateOrderOutput)
  async createOrder(
    @Args('input') input: CreateOrderInput,
    @Context() context,
  ): Promise<CreateOrderOutput> {
    const user = context.req.user;
    return this.orderService.createOrder(input, user.id);
  }
}
