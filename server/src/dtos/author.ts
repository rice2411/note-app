import { InputType, Field } from '@nestjs/graphql';

//for GraphQL
@InputType()
export class AuthorRequest {
  @Field()
  uid: string;
  @Field()
  name: string;
}

//for MongoDB

export interface IAuthorRequestDTO {
  uid: string;
  name: string;
}
