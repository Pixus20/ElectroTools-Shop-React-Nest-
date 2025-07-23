import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResponseInput } from './dto/create-response.input';
import { ResponseModel } from './models/response.model';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  createResponse(input: CreateResponseInput) {
    return this.prisma.response.create({
      data: {
        responceText: input.responceText,
        likes: input.likes,
        user: { connect: { id: input.userId } },
        product: { connect: { id: input.productId } },
      },
    });
  }

  getAllResponses() {
    return this.prisma.response.findMany();
  }

  getResponseById(id: number) {
    return this.prisma.response.findUnique({ where: { id } });
  }

  deleteResponse(id: number) {
    return this.prisma.response.delete({ where: { id } });
  }

  likeResponse(id: number) {
    return this.prisma.response.update({
      where: { id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  }

  async getResponsesByProductId(productId: number): Promise<ResponseModel[]> {
    return this.prisma.response.findMany({
      where: { productId },
      include: {
        user: true,
        product: true, 
      },
    });
  }
}
