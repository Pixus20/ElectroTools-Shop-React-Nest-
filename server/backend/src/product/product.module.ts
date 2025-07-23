import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
@Module({
   imports: [PrismaModule],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
