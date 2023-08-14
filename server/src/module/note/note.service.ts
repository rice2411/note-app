import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INoteRequestDTO, NoteUpdateRequest } from 'src/dtos/note';
import { Note } from 'src/model/mongo/note';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note.name)
    private noteModel: Model<Note>,
  ) {}
  async getNoteById(noteId: string) {
    return this.noteModel.findById(noteId).exec();
  }
  async updateNote(noteRequest: NoteUpdateRequest) {
    const noteUpdated = await this.noteModel.findByIdAndUpdate(
      noteRequest._id,
      noteRequest,
    );

    return noteUpdated;
  }
  async createNote(noteRequest: INoteRequestDTO) {
    const newNote = new this.noteModel({ content: 'Empty', ...noteRequest });
    newNote.save();
    return newNote;
  }
  async getNotesByFolderId(folderId: string) {
    return this.noteModel
      .find({ folderId: folderId })
      .sort({ updatedAt: 'desc' })
      .exec();
  }
}
