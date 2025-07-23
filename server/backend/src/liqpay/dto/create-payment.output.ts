import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreatePaymentOutput {
  @Field()
  data: string;

  @Field()
  signature: string;
}