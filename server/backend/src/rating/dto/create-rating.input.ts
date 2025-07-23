import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrUpdateRatingInput {
  @Field(() => Int)
  productId: number;

  @Field(() => Float)
  rate: number;
}
