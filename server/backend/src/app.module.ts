
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CommentModule } from './comment/comment.module';
import { LiqpayModule } from './liqpay/liqpay.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { RatingModule } from './rating/rating.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    AuthModule,
    UserModule,
    ProductModule,
    CommentModule,
    RatingModule,
    LiqpayModule,
    OrderModule,
    CartModule,
  ],
})
export class AppModule {}
