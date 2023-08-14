export const NoteTypeDefs = {
  getNoteById: `query Note($noteId: String!){
    getNoteById(noteId: $noteId) {
      _id
      content
    }
  }`,
  getNotesByFolderId: `query Note($folderId: String!){
    getNotesByFolderId(folderId: $folderId) {
      _id
      content
      updatedAt
    }
  }`,
  createNote: `mutation Note($folderId: String!){
    createNote(noteRequest: {folderId: $folderId}) {
      _id
      content
    }
  }`,
  updateNote: `mutation Note($_id: String!, $content: String!){
    updateNote(noteRequest: {_id: $_id, content: $content}) {
      _id
      content
    }
  }`,
};
