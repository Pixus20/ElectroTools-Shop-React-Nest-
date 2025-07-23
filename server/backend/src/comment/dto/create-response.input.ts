import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateResponseInput {
  @Field()
  @IsString()
  responceText: string;

  @Field(() => Int)
  @IsInt()
  likes: number;

  @Field(() => Int)
  @IsInt()
  userId: number;

  @Field(() => Int)
  @IsInt()
  productId: number;
}
