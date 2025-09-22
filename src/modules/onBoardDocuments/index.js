const OnBoardDocumentsHandler = require('./handler');

module.exports = {
  createOnBoardDocument: OnBoardDocumentsHandler.createOnBoardDocument.bind(OnBoardDocumentsHandler),
  getOnBoardDocument: OnBoardDocumentsHandler.getOnBoardDocument.bind(OnBoardDocumentsHandler),
  listOnBoardDocuments: OnBoardDocumentsHandler.listOnBoardDocuments.bind(OnBoardDocumentsHandler),
  updateOnBoardDocument: OnBoardDocumentsHandler.updateOnBoardDocument.bind(OnBoardDocumentsHandler),
  deleteOnBoardDocument: OnBoardDocumentsHandler.deleteOnBoardDocument.bind(OnBoardDocumentsHandler),
  restoreOnBoardDocument: OnBoardDocumentsHandler.restoreOnBoardDocument.bind(OnBoardDocumentsHandler),
  getOnBoardDocumentWithRelations: OnBoardDocumentsHandler.getOnBoardDocumentWithRelations.bind(OnBoardDocumentsHandler),
  getOnBoardDocumentsPost: OnBoardDocumentsHandler.getOnBoardDocumentsPost.bind(OnBoardDocumentsHandler),
  getOnBoardDocumentsByCandidate: OnBoardDocumentsHandler.getOnBoardDocumentsByCandidate.bind(OnBoardDocumentsHandler),
};
