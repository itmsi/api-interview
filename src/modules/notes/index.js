const NotesHandler = require('./handler');

module.exports = {
  createNote: NotesHandler.createNote.bind(NotesHandler),
  getNote: NotesHandler.getNote.bind(NotesHandler),
  updateNote: NotesHandler.updateNote.bind(NotesHandler),
  deleteNote: NotesHandler.deleteNote.bind(NotesHandler),
  restoreNote: NotesHandler.restoreNote.bind(NotesHandler),
  getNoteWithRelations: NotesHandler.getNoteWithRelations.bind(NotesHandler),
  getNotesPost: NotesHandler.getNotesPost.bind(NotesHandler),
};
