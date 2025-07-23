import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AverageRatingOutput {
  @Field(() => Float)
  average: number;

  @Field(() => Int)
  count: number;
}