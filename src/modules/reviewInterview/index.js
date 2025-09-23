const ReviewInterviewHandler = require('./handler');

module.exports = {
  getReviewInterviewData: ReviewInterviewHandler.getReviewInterviewData.bind(ReviewInterviewHandler),
};
