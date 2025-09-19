const GendersHandler = require('./handler');

module.exports = {
  getGender: GendersHandler.getGender.bind(GendersHandler),
  listGenders: GendersHandler.listGenders.bind(GendersHandler),
  getGendersPost: GendersHandler.getGendersPost.bind(GendersHandler),
};
