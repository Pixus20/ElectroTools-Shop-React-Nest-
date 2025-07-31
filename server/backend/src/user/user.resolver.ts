import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UpdateUserInput } from './dto/update-user.input';
import { UserModel } from './models/user.model';
import { UsersService } from './user.service';



interface JwtPayload {
  id: number;
  email: string;
  role: 'USER' | 'MODERATOR' | 'ADMIN';
}

@Resolver(() => UserModel)
export class UserResolver {
 

  constructor(private readonly userService: UsersService) {}


  @Query(() => [UserModel])
  async users() {
    return this.userService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserModel)
  async me(@CurrentUser() user: JwtPayload) {
    return this.userService.findById(user.id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Query(() => [UserModel])
  async usersGuard() {
    return this.userService.findAll();
}

@UseGuards(GqlAuthGuard)
@Mutation(() => UserModel)
async updateMe(
  @CurrentUser() user: JwtPayload,
  @Args('input') input: UpdateUserInput,
) {
  return this.userService.update(user.id, input);
}

}
