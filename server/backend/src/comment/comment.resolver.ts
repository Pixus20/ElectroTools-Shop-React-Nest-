import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateResponseInput } from './dto/create-response.input';
import { ResponseModel } from './models/response.model';

@Resolver(() => ResponseModel)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => ResponseModel)
  createResponse(@Args('createResponseInput') dto: CreateResponseInput) {
    return this.commentService.createResponse(dto);
  }

  @Query(() => [ResponseModel])
  getAllResponses() {
    return this.commentService.getAllResponses();
  }

  @Query(() => [ResponseModel])
  getResponsesByProductId(@Args('productId', { type: () => Int }) productId: number) {
    return this.commentService.getResponsesByProductId(productId);
  }

  @Query(() => ResponseModel)
  getResponseById(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.getResponseById(id);
  }

  @Mutation(() => ResponseModel)
  deleteResponse(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.deleteResponse(id);
  }

  @Mutation(() => ResponseModel)
  likeResponse(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.likeResponse(id);
  }
}
