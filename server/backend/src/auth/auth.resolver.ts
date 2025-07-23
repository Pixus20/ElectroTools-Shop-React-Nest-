import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserModel } from '../user/models/user.model';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserModel)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => String)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput.email, loginInput.password);
  }
}