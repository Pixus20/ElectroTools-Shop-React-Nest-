import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductInCartModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  imgURL: string;
}

@ObjectType()
export class CartItem {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => ProductInCartModel)
  product: ProductInCartModel;
}
