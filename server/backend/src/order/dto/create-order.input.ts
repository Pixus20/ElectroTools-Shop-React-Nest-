import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  productId: number;

  @Field(() => Float)
  amount: number;

  @Field(() => Int)
  quantity: number;

  @Field()
  orderId: string;

  @Field()
  liqpayData: string;

  @Field()
  liqpaySignature: string;
}
