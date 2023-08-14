import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NoteGraphQLModel {
  @Field()
  _id: string;

  @Field()
  content: string;

  @Field()
  folderId: string;

  @Field()
  updatedAt: Date;
}
