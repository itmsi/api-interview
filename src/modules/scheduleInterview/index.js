const ScheduleInterviewHandler = require('./handler');

module.exports = {
  getScheduleInterview: ScheduleInterviewHandler.getScheduleInterview.bind(ScheduleInterviewHandler),
  listScheduleInterviews: ScheduleInterviewHandler.listScheduleInterviews.bind(ScheduleInterviewHandler),
  createScheduleInterview: ScheduleInterviewHandler.createScheduleInterview.bind(ScheduleInterviewHandler),
  updateScheduleInterview: ScheduleInterviewHandler.updateScheduleInterview.bind(ScheduleInterviewHandler),
  deleteScheduleInterview: ScheduleInterviewHandler.deleteScheduleInterview.bind(ScheduleInterviewHandler),
  restoreScheduleInterview: ScheduleInterviewHandler.restoreScheduleInterview.bind(ScheduleInterviewHandler),
  getScheduleInterviewsPost: ScheduleInterviewHandler.getScheduleInterviewsPost.bind(ScheduleInterviewHandler),
};
