import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CreatePaymentInput } from './dto/create-payment.input';
import { CreatePaymentOutput } from './dto/create-payment.output';
import { LiqpayService } from './liqpay.service';

@Resolver()
export class LiqpayResolver {
  constructor(private readonly liqpayService: LiqpayService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CreatePaymentOutput)
  createPayment(
    @Args('input') input: CreatePaymentInput,
    @Context() context
  ): CreatePaymentOutput {
    const user = context.req.user;
    const description = `Оплата замовлення №${input.orderId} користувачем ID ${user.id}`;

    return this.liqpayService.generatePayment(input.amount, input.orderId, description);
  }
}
