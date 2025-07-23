// user.model.ts
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

registerEnumType(Role, {
  name: 'Role',
  description: 'The roles of the user',
});

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  secondName: string;

  @Field()
  nicname?: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  avatarURL?: string;

  @Field()
  birthDay?: Date;

  @Field()
  sex?: string;

  @Field(() => Role)
  role: Role;

  @Field()
  createdAt: Date;
}
