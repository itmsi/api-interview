const CandidatesHandler = require('./handler');

module.exports = {
  createCandidate: CandidatesHandler.createCandidate.bind(CandidatesHandler),
  getCandidate: CandidatesHandler.getCandidate.bind(CandidatesHandler),
  listCandidates: CandidatesHandler.listCandidates.bind(CandidatesHandler),
  updateCandidate: CandidatesHandler.updateCandidate.bind(CandidatesHandler),
  deleteCandidate: CandidatesHandler.deleteCandidate.bind(CandidatesHandler),
  restoreCandidate: CandidatesHandler.restoreCandidate.bind(CandidatesHandler),
  getCandidateWithRelations: CandidatesHandler.getCandidateWithRelations.bind(CandidatesHandler),
  getCandidatesPost: CandidatesHandler.getCandidatesPost.bind(CandidatesHandler),
};
