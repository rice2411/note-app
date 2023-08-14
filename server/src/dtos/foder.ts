import { InputType, Field } from '@nestjs/graphql';

//for GraphQL
@InputType()
export class FolderRequest {
  @Field()
  name: string;
}

//for MongoDB
export interface IFolderDTO {
  _id: string;
  name: string;
  createdAt: Date;
  authorId: string;
}
export interface IFolderRequestDTO {
  name: string;
  authorId: string;
}
