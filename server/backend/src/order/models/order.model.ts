import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ProductModel } from 'src/product/models/product.model';
import { UserModel } from 'src/user/models/user.model';
import { OrderStatus } from '../enums/order-status.enum';


@ObjectType()
export class Order {
  @Field(() => Int)
  id: number;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => Float)
  amount: number;

  @Field(() => Int)
  quantity: number;

  @Field()
  orderId: string;

  @Field({ nullable: true })
  liqpayData?: string;

  @Field({ nullable: true })
  liqpaySignature?: string;

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
