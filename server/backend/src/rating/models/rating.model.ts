import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ProductModel } from 'src/product/models/product.model';
import { UserModel } from 'src/user/models/user.model';

@ObjectType()
export class RatingModel {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  rate: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => ProductModel)
  product: ProductModel;
}
