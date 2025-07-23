import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field()
  amount: number;

  @Field()
  orderId: string;
}