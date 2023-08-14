import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema({ timestamps: true })
export class Note {
  @Prop()
  content: string;
  @Prop({ required: true })
  folderId: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
