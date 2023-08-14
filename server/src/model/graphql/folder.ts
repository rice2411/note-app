import { Field, ObjectType } from '@nestjs/graphql';
import { AuthorGraphQLModel } from './author';
import { NoteGraphQLModel } from './note';

@ObjectType()
export class FolderGraphQLModel {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  createdAt: string;

  @Field((type) => AuthorGraphQLModel)
  author: AuthorGraphQLModel;

  @Field((type) => [NoteGraphQLModel])
  notes: [NoteGraphQLModel];
}
