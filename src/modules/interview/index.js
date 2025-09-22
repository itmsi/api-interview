const InterviewHandler = require('./handler');

module.exports = {
  getInterview: InterviewHandler.getInterview.bind(InterviewHandler),
  listInterviews: InterviewHandler.listInterviews.bind(InterviewHandler),
  createInterview: InterviewHandler.createInterview.bind(InterviewHandler),
  updateInterview: InterviewHandler.updateInterview.bind(InterviewHandler),
  deleteInterview: InterviewHandler.deleteInterview.bind(InterviewHandler),
  restoreInterview: InterviewHandler.restoreInterview.bind(InterviewHandler),
  getInterviewsPost: InterviewHandler.getInterviewsPost.bind(InterviewHandler),
};
