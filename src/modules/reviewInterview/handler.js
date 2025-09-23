const ReviewInterviewRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');

class ReviewInterviewHandler {
  /**
   * POST /reviewInterview - Get review interview data
   * Menampilkan data candidates yang telah melakukan interview dengan filter
   */
  async getReviewInterviewData(req, res) {
    try {
      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['candidate_name', 'candidate_email', 'company_name', 'title_name', 'create_at'],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: [
          'candidates.candidate_name', 
          'candidates.candidate_email',
          'companies.company_name',
          'titles.title_name'
        ],
        allowedFilters: [
          'interview_id',
          'candidate_id', 
          'company_id',
          'title_id',
          'departement_id'
        ],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters

      // Get data dengan filter dan pagination
      const result = await ReviewInterviewRepository.findWithFilters(queryParams);

      // Format response sesuai dengan requirement
      const formattedResponse = {
        statusCode: 200,
        message: 'Dashboard data retrieved successfully',
        data: {
          recent_candidates: result.data.map(candidate => ({
            id: candidate.candidate_id,
            name: candidate.candidate_name,
            email: candidate.candidate_email,
            position: candidate.title_name,
            company: candidate.company_name,
            image: candidate.candidate_foto,
            date_applied: candidate.create_at
          }))
        }
      };

      // Send success response dengan format yang diminta
      return res.status(200).json(formattedResponse);

    } catch (error) {
      console.error('Error getting review interview data:', error);
      return sendQueryError(res, 'Failed to get review interview data', 500);
    }
  }
}

module.exports = new ReviewInterviewHandler();
