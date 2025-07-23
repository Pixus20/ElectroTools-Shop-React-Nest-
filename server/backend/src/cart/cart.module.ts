import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';

@Module({
  imports: [PrismaModule],
  providers: [CartResolver, CartService],
})
export class CartModule {}