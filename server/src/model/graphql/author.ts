import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorGraphQLModel {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  uid: string;
}
