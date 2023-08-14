import { InputType, Field } from '@nestjs/graphql';

//for GraphQL
@InputType()
export class NoteRequest {
  @Field()
  folderId: string;
}
@InputType()
export class NoteUpdateRequest {
  @Field()
  _id: string;
  @Field()
  content: string;
}
//for MongoDB

export interface INoteRequestDTO {
  folderId: string;
}
