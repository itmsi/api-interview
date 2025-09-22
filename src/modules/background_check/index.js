const BackgroundCheckHandler = require('./handler');

module.exports = {
  createBackgroundCheck: BackgroundCheckHandler.createBackgroundCheck.bind(BackgroundCheckHandler),
  getBackgroundCheck: BackgroundCheckHandler.getBackgroundCheck.bind(BackgroundCheckHandler),
  listBackgroundChecks: BackgroundCheckHandler.listBackgroundChecks.bind(BackgroundCheckHandler),
  updateBackgroundCheck: BackgroundCheckHandler.updateBackgroundCheck.bind(BackgroundCheckHandler),
  deleteBackgroundCheck: BackgroundCheckHandler.deleteBackgroundCheck.bind(BackgroundCheckHandler),
  restoreBackgroundCheck: BackgroundCheckHandler.restoreBackgroundCheck.bind(BackgroundCheckHandler),
  getBackgroundCheckWithRelations: BackgroundCheckHandler.getBackgroundCheckWithRelations.bind(BackgroundCheckHandler),
  getBackgroundChecksPost: BackgroundCheckHandler.getBackgroundChecksPost.bind(BackgroundCheckHandler),
  getBackgroundChecksByCandidate: BackgroundCheckHandler.getBackgroundChecksByCandidate.bind(BackgroundCheckHandler),
};
