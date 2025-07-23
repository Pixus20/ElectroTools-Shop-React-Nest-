import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateOrderOutput {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}
