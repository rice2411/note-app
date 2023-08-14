import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NoteGraphQLModel } from 'src/model/graphql/note';
import { NoteService } from './note.service';
import { NoteRequest, NoteUpdateRequest } from 'src/dtos/note';

@Resolver(() => NoteGraphQLModel)
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {}

  @Query(() => NoteGraphQLModel)
  async getNoteById(@Args('noteId') noteId: string) {
    return this.noteService.getNoteById(noteId);
  }
  @Query(() => [NoteGraphQLModel])
  async getNotesByFolderId(@Args('folderId') folderId: string) {
    return this.noteService.getNotesByFolderId(folderId);
  }
  @Mutation(() => NoteGraphQLModel)
  async createNote(@Args('noteRequest') noteRequest: NoteRequest) {
    return this.noteService.createNote(noteRequest);
  }
  @Mutation(() => NoteGraphQLModel)
  async updateNote(@Args('noteRequest') noteRequest: NoteUpdateRequest) {
    return this.noteService.updateNote(noteRequest);
  }
}
