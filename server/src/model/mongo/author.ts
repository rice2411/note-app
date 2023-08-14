import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema({ timestamps: true })
export class Author {
  @Prop({ required: true })
  uid: string;
  @Prop({ required: true })
  name: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
