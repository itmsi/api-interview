const ScheduleInterviewRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');

class ScheduleInterviewHandler {
  async createScheduleInterview(req, res) {
    try {
      const {
        candidate_id,
        assign_role,
        employee_id,
        schedule_interview_date,
        schedule_interview_time,
        schedule_interview_duration
      } = req.body;

      const createdBy = req.user?.user_id || null;

      const scheduleInterviewData = {
        candidate_id,
        assign_role: assign_role || '',
        employee_id: employee_id || [],
        schedule_interview_date: schedule_interview_date || null,
        schedule_interview_time: schedule_interview_time || null,
        schedule_interview_duration: schedule_interview_duration || '',
        create_by: createdBy
      };

      const scheduleInterview = await ScheduleInterviewRepository.create(scheduleInterviewData);

      res.status(201).json({
        success: true,
        message: 'Schedule interview created successfully',
        data: scheduleInterview
      });
    } catch (error) {
      console.error('Error creating schedule interview:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create schedule interview',
        error: error.message
      });
    }
  }

  async getScheduleInterview(req, res) {
    try {
      const { id } = req.params;

      const scheduleInterview = await ScheduleInterviewRepository.findByIdWithDetails(id);
      if (!scheduleInterview) {
        return res.status(404).json({
          success: false,
          message: 'Schedule interview not found'
        });
      }

      res.json({
        success: true,
        message: 'Schedule interview retrieved successfully',
        data: scheduleInterview
      });
    } catch (error) {
      console.error('Error getting schedule interview:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get schedule interview',
        error: error.message
      });
    }
  }

  async listScheduleInterviews(req, res) {
    try {
      // Parse query parameters dengan konfigurasi standar
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['schedule_interview_date', 'schedule_interview_time', 'assign_role', 'create_at', 'update_at'],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: ['candidates.candidate_name', 'schedule_interview.assign_role'],
        allowedFilters: [
          'schedule_interview.schedule_interview_id', 
          'schedule_interview.candidate_id',
          'schedule_interview.assign_role',
          'schedule_interview.schedule_interview_date', 
          'schedule_interview.schedule_interview_time',
          'schedule_interview.schedule_interview_duration'
        ]
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await ScheduleInterviewRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Schedule interviews retrieved successfully');

    } catch (error) {
      console.error('Error listing schedule interviews:', error);
      return sendQueryError(res, 'Failed to list schedule interviews', 500);
    }
  }

  async updateScheduleInterview(req, res) {
    try {
      const { id } = req.params;
      const {
        assign_role,
        employee_id,
        schedule_interview_date,
        schedule_interview_time,
        schedule_interview_duration
      } = req.body;

      const updatedBy = req.user?.user_id || null;

      const existingScheduleInterview = await ScheduleInterviewRepository.findById(id);
      if (!existingScheduleInterview) {
        return res.status(404).json({
          success: false,
          message: 'Schedule interview not found'
        });
      }

      const updateData = {
        update_by: updatedBy
      };

      // Update fields only if provided
      if (assign_role !== undefined) updateData.assign_role = assign_role;
      if (employee_id !== undefined) updateData.employee_id = employee_id;
      if (schedule_interview_date !== undefined) updateData.schedule_interview_date = schedule_interview_date;
      if (schedule_interview_time !== undefined) updateData.schedule_interview_time = schedule_interview_time;
      if (schedule_interview_duration !== undefined) updateData.schedule_interview_duration = schedule_interview_duration;

      const scheduleInterview = await ScheduleInterviewRepository.update(id, updateData);

      res.json({
        success: true,
        message: 'Schedule interview updated successfully',
        data: scheduleInterview
      });
    } catch (error) {
      console.error('Error updating schedule interview:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update schedule interview',
        error: error.message
      });
    }
  }

  async deleteScheduleInterview(req, res) {
    try {
      const { id } = req.params;
      const deletedBy = req.user?.user_id || null;

      const existingScheduleInterview = await ScheduleInterviewRepository.findById(id);
      if (!existingScheduleInterview) {
        return res.status(404).json({
          success: false,
          message: 'Schedule interview not found'
        });
      }

      await ScheduleInterviewRepository.softDelete(id, deletedBy);

      res.json({
        success: true,
        message: 'Schedule interview deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting schedule interview:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete schedule interview',
        error: error.message
      });
    }
  }

  async restoreScheduleInterview(req, res) {
    try {
      const { id } = req.params;
      const updatedBy = req.user?.user_id || null;

      const scheduleInterview = await ScheduleInterviewRepository.restore(id, updatedBy);
      if (!scheduleInterview) {
        return res.status(404).json({
          success: false,
          message: 'Schedule interview not found or already restored'
        });
      }

      res.json({
        success: true,
        message: 'Schedule interview restored successfully',
        data: scheduleInterview
      });
    } catch (error) {
      console.error('Error restoring schedule interview:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to restore schedule interview',
        error: error.message
      });
    }
  }

  // POST /schedule-interviews/get - Get schedule interviews with POST method
  async getScheduleInterviewsPost(req, res) {
    try {
      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['schedule_interview_date', 'schedule_interview_time', 'assign_role', 'create_at', 'update_at'],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: ['candidates.candidate_name', 'schedule_interview.assign_role'],
        allowedFilters: [
          'schedule_interview.schedule_interview_id', 
          'schedule_interview.candidate_id',
          'schedule_interview.assign_role',
          'schedule_interview.schedule_interview_date', 
          'schedule_interview.schedule_interview_time',
          'schedule_interview.schedule_interview_duration'
        ],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await ScheduleInterviewRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Schedule interviews retrieved successfully');

    } catch (error) {
      console.error('Error getting schedule interviews via POST:', error);
      return sendQueryError(res, 'Failed to get schedule interviews', 500);
    }
  }
}

module.exports = new ScheduleInterviewHandler();
