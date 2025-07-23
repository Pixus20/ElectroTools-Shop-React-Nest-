import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  secondName?: string;

  @Field({ nullable: true })
  nicname?: string;

  @Field({ nullable: true })
  avatarURL?: string;

  @Field({ nullable: true })
  birthDay?: Date;

  @Field({ nullable: true })
  sex?: string;
}
