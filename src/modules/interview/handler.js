const InterviewRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');

class InterviewHandler {
  async createInterview(req, res) {
    try {
      const {
        schedule_interview_id,
        company_value,
        comment,
        employee_id,
        aspect,
        question,
        answer,
        score
      } = req.body;

      const createdBy = req.user?.user_id || null;

      const interviewData = {
        schedule_interview_id,
        company_value,
        comment: comment || null,
        employee_id: employee_id || null,
        aspect: aspect || null,
        question: question || null,
        answer: answer || null,
        score: score !== undefined ? score : 0,
        create_by: createdBy
      };

      const interview = await InterviewRepository.create(interviewData);

      res.status(201).json({
        success: true,
        message: 'Interview created successfully',
        data: interview
      });
    } catch (error) {
      console.error('Error creating interview:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create interview',
        error: error.message
      });
    }
  }

  async getInterview(req, res) {
    try {
      const { id } = req.params;

      const interview = await InterviewRepository.findByIdWithDetails(id);
      if (!interview) {
        return res.status(404).json({
          success: false,
          message: 'Interview not found'
        });
      }

      res.json({
        success: true,
        message: 'Interview retrieved successfully',
        data: interview
      });
    } catch (error) {
      console.error('Error getting interview:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get interview',
        error: error.message
      });
    }
  }

  async listInterviews(req, res) {
    try {
      // Parse query parameters dengan konfigurasi standar
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['company_value', 'create_at', 'update_at', 'schedule_interview_date'],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: [
          'interview.company_value', 
          'interview.comment',
          'employees.employee_name',
          'candidates.candidate_name'
        ],
        allowedFilters: [
          'interview.interview_id',
          'interview.schedule_interview_id', 
          'interview.company_value',
          'interview.employee_id',
          'schedule_interview.schedule_interview_date'
        ]
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await InterviewRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Interviews retrieved successfully');

    } catch (error) {
      console.error('Error listing interviews:', error);
      return sendQueryError(res, 'Failed to list interviews', 500);
    }
  }

  async updateInterview(req, res) {
    try {
      const { id } = req.params;
      const {
        schedule_interview_id,
        company_value,
        comment,
        employee_id,
        aspect,
        question,
        answer,
        score
      } = req.body;

      const updatedBy = req.user?.user_id || null;

      const existingInterview = await InterviewRepository.findById(id);
      if (!existingInterview) {
        return res.status(404).json({
          success: false,
          message: 'Interview not found'
        });
      }

      const updateData = {
        update_by: updatedBy
      };

      // Update fields only if provided
      if (schedule_interview_id !== undefined) updateData.schedule_interview_id = schedule_interview_id;
      if (company_value !== undefined) updateData.company_value = company_value;
      if (comment !== undefined) updateData.comment = comment;
      if (employee_id !== undefined) updateData.employee_id = employee_id;
      if (aspect !== undefined) updateData.aspect = aspect;
      if (question !== undefined) updateData.question = question;
      if (answer !== undefined) updateData.answer = answer;
      if (score !== undefined) updateData.score = score;

      const interview = await InterviewRepository.update(id, updateData);

      res.json({
        success: true,
        message: 'Interview updated successfully',
        data: interview
      });
    } catch (error) {
      console.error('Error updating interview:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update interview',
        error: error.message
      });
    }
  }

  async deleteInterview(req, res) {
    try {
      const { id } = req.params;
      const deletedBy = req.user?.user_id || null;

      const existingInterview = await InterviewRepository.findById(id);
      if (!existingInterview) {
        return res.status(404).json({
          success: false,
          message: 'Interview not found'
        });
      }

      await InterviewRepository.softDelete(id, deletedBy);

      res.json({
        success: true,
        message: 'Interview deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting interview:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete interview',
        error: error.message
      });
    }
  }

  async restoreInterview(req, res) {
    try {
      const { id } = req.params;
      const updatedBy = req.user?.user_id || null;

      const interview = await InterviewRepository.restore(id, updatedBy);
      if (!interview) {
        return res.status(404).json({
          success: false,
          message: 'Interview not found or already restored'
        });
      }

      res.json({
        success: true,
        message: 'Interview restored successfully',
        data: interview
      });
    } catch (error) {
      console.error('Error restoring interview:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to restore interview',
        error: error.message
      });
    }
  }

  // POST /interviews/get - Get interviews with POST method
  async getInterviewsPost(req, res) {
    try {
      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['company_value', 'create_at', 'update_at', 'schedule_interview_date'],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: [
          'interview.company_value', 
          'interview.comment',
          'employees.employee_name',
          'candidates.candidate_name'
        ],
        allowedFilters: [
          'interview.interview_id',
          'interview.schedule_interview_id', 
          'interview.company_value',
          'interview.employee_id',
          'schedule_interview.schedule_interview_date'
        ],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await InterviewRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Interviews retrieved successfully');

    } catch (error) {
      console.error('Error getting interviews via POST:', error);
      return sendQueryError(res, 'Failed to get interviews', 500);
    }
  }
}

module.exports = new InterviewHandler();
