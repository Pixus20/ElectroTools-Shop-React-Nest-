import { Field, InputType } from '@nestjs/graphql';

// @InputType()
// export class RegisterInput {
//   @Field()
//   email: string;

//   @Field()
//   password: string;

//   @Field()
//   firstName: string;

//   @Field()
//   secondName: string;

//   @Field()
//   nicname: string;
// }



@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  secondName: string;

  @Field()
  nicname: string;

  @Field({ nullable: true })
  avatarURL?: string;

  @Field({ nullable: true })
  birthDay?: Date;

  @Field({ nullable: true })
  sex?: string;

  @Field({ nullable: true })
  role?: string;
}
