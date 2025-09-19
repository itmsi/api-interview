const TitlesHandler = require('./handler');

module.exports = {
  getTitle: TitlesHandler.getTitle.bind(TitlesHandler),
  listTitles: TitlesHandler.listTitles.bind(TitlesHandler),
  getTitleWithDepartment: TitlesHandler.getTitleWithDepartment.bind(TitlesHandler),
  getTitlesPost: TitlesHandler.getTitlesPost.bind(TitlesHandler),
};
