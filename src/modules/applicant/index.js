const ApplicantHandler = require('./handler');

module.exports = {
  createApplicant: ApplicantHandler.createApplicant.bind(ApplicantHandler),
  getApplicant: ApplicantHandler.getApplicant.bind(ApplicantHandler),
  getApplicantsPost: ApplicantHandler.getApplicantsPost.bind(ApplicantHandler),
  listApplicants: ApplicantHandler.listApplicants.bind(ApplicantHandler),
  updateApplicant: ApplicantHandler.updateApplicant.bind(ApplicantHandler),
  deleteApplicant: ApplicantHandler.deleteApplicant.bind(ApplicantHandler),
  createApplicantPublic: ApplicantHandler.createApplicantPublic.bind(ApplicantHandler),
};
