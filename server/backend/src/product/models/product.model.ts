import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductModel {
  @Field(() => Int)
  id: number;

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

  @Field()
  createdAt: Date;
}
