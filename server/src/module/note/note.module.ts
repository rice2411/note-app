import { Module } from '@nestjs/common';
import { NoteResolver } from './note.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from 'src/model/mongo';
import { Note } from 'src/model/mongo/note';
import { NoteService } from './note.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  providers: [NoteResolver, NoteService],
})
export class NoteModule {}
