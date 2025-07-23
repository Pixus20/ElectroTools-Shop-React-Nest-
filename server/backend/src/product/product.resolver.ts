import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductModel } from './models/product.model';
import { ProductService } from './product.service';



@Resolver(() => ProductModel)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Mutation(() => ProductModel)
  createProduct(@Args('createProductInput') input: CreateProductInput) {
    return this.productService.create(input);
  }

  @Query(() => [ProductModel])
  products() {
    return this.productService.findAll();
  }

  @Query(() => ProductModel, { nullable: true })
  product(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findById(id);
  }

  @Mutation(() => ProductModel)
  updateProduct(@Args('updateProductInput') input: UpdateProductInput) {
    return this.productService.update(input);
  }

  @Mutation(() => ProductModel)
  deleteProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
