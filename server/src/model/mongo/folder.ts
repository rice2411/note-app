import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FolderDocument = HydratedDocument<Folder>;

@Schema({ timestamps: true })
export class Folder {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  authorId: string;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
