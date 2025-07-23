import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductInput) {
    return this.prisma.product.create({ data });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findById(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(data: UpdateProductInput) {
    const { id, ...rest } = data;
    return this.prisma.product.update({
      where: { id },
      data: rest,
    });
  }
  
  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

}
