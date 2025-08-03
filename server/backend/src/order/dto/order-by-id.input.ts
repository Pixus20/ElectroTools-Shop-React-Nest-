import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class OrderByIdInput {
  @Field(() => Int)
  id: number;
}