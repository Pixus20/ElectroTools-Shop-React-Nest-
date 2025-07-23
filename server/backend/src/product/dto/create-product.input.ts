import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  imgURL: string;

  @Field()
  shortDescr: string;

  @Field()
  fullDescr: string;

  @Field(() => Float)
  price: number;

  @Field()
  category: string;

  @Field()
  color: string;

  @Field()
  season: string;

  @Field(() => Int)
  quantity: number;
  
  @Field(() => Int)
  buyerId: number;
}
