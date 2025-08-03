import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CreateOrderInput } from './dto/create-order.input';
import { CreateOrderOutput } from './dto/create-order.output';
import { OrderStatus } from './enums/order-status.enum';
import { Order } from './models/order.model';
import { OrderService } from './order.service';

@Resolver(() => Order)
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

  @Query(() => [Order])
ordersByStatus(
  @Args('statuses', { type: () => [OrderStatus] }) statuses: OrderStatus[],
) {
  return this.orderService.findByStatuses(statuses);
}

@Query(() => Order)
GetOrderById(@Args('id', { type: () => Int }) id: number) {
  return this.orderService.findById(id);
}
}
