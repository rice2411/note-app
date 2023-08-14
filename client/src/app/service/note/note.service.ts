import { Injectable } from '@angular/core';
import { GraphqlService } from '../graphql/graphql.service';
import { NoteTypeDefs } from './note.typedefs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private graphqlService: GraphqlService) {}

  getNoteById(noteId: string) {
    const query = NoteTypeDefs.getNoteById;
    const params = { noteId };
    return this.graphqlService.request(query, params);
  }

  getNotesByFolderId(folderId: string) {
    const query = NoteTypeDefs.getNotesByFolderId;
    const params = { folderId };
    return this.graphqlService.request(query, params);
  }
  createNote(folderId: string) {
    const query = NoteTypeDefs.createNote;
    const params = { folderId };
    return this.graphqlService.request(query, params);
  }
  updateNote(noteId: string, content: string) {
    const query = NoteTypeDefs.updateNote;
    const params = { _id: noteId, content };
    return this.graphqlService.request(query, params);
  }
}
