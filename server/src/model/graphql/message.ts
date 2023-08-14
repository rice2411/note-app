import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageGraphQLModel {
  @Field({ nullable: true })
  content: string;
}
