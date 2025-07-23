// import { UseGuards } from '@nestjs/common';
// import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
// import { CurrentUser } from '../auth/current-user.decorator';
// import { AverageRatingOutput } from './dto/average-rating.output';
// import { CreateOrUpdateRatingInput } from './dto/create-rating.input';
// import { RatingModel } from './models/rating.model';
// import { RatingService } from './rating.service';

// @Resolver(() => RatingModel)
// export class RatingResolver {
//   constructor(private readonly ratingService: RatingService) {}

//   @Query(() => AverageRatingOutput)
//   getAverageRating(@Args('productId', { type: () => Int }) productId: number) {
//     return this.ratingService.getAverageRating(productId);
//   }

//   @UseGuards(GqlAuthGuard)
//   @Mutation(() => RatingModel)
//   rateProduct(
//     @CurrentUser('id') userId: number,
//     @Args('input') input: CreateOrUpdateRatingInput,
//   ) {
//     return this.ratingService.createOrUpdateRating(userId, input.productId, input.rate);
//   }

//   @UseGuards(GqlAuthGuard)
//   @Query(() => RatingModel, { nullable: true })
//   getUserRating(
//     @CurrentUser('id') userId: number,
//     @Args('productId', { type: () => Int }) productId: number,
//   ) {
//     return this.ratingService.getUserRating(userId, productId);
//   }
// }


import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { AverageRatingOutput } from './dto/average-rating.output';
import { CreateOrUpdateRatingInput } from './dto/create-rating.input';
import { RatingModel } from './models/rating.model';
import { RatingService } from './rating.service';

interface JwtPayload {
  id: number;
  email: string;
  role: 'USER' | 'MODERATOR' | 'ADMIN';
}

@Resolver(() => RatingModel)
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => RatingModel)
  async rateProduct(
    @Args('input') input: CreateOrUpdateRatingInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.ratingService.createOrUpdateRating(user.id, input.productId, input.rate);
  }

//   @Query(() => Float)
//   async getAverageRating(@Args('productId', { type: () => Int }) productId: number) {
//     const result = await this.ratingService.getAverageRating(productId);
//     return result.average;
//   }

@Query(() => AverageRatingOutput)
getAverageRating(
  @Args('productId', { type: () => Int }) productId: number
) {
  return this.ratingService.getAverageRating(productId);
}


  @UseGuards(GqlAuthGuard)
  @Query(() => RatingModel, { nullable: true })
  async getUserRating(
    @Args('productId', { type: () => Int }) productId: number,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.ratingService.getUserRating(user.id, productId);
  }
}
