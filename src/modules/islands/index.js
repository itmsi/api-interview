const IslandsHandler = require('./handler');

module.exports = {
  getIsland: IslandsHandler.getIsland.bind(IslandsHandler),
  listIslands: IslandsHandler.listIslands.bind(IslandsHandler),
  getIslandsPost: IslandsHandler.getIslandsPost.bind(IslandsHandler),
};
