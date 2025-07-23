import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductModel } from '../../product/models/product.model';
import { UserModel } from '../../user/models/user.model';
@ObjectType()
export class ResponseModel {
  @Field(() => Int)
  id: number;

  @Field()
  responceText: string;

  @Field(() => Int)
  likes: number;

  @Field()
  createdAt: Date;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  productId: number;

  @Field(() => UserModel)
  user: UserModel;

  @Field(() => ProductModel)
  product: ProductModel;
}
