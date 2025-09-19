const TitlesRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');

class TitlesHandler {
  async getTitle(req, res) {
    try {
      const { id } = req.params;

      const title = await TitlesRepository.findById(id);
      if (!title) {
        return res.status(404).json({
          success: false,
          message: 'Title not found'
        });
      }

      res.json({
        success: true,
        message: 'Title retrieved successfully',
        data: title
      });
    } catch (error) {
      console.error('Error getting title:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get title',
        error: error.message
      });
    }
  }

  async listTitles(req, res) {
    try {
      // Parse query parameters dengan konfigurasi standar
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['title_name', 'created_at', 'updated_at'],
        defaultOrder: ['created_at', 'desc'],
        searchableColumns: ['title_name'],
        allowedFilters: ['title_name', 'department_id']
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await TitlesRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Titles retrieved successfully');

    } catch (error) {
      console.error('Error listing titles:', error);
      return sendQueryError(res, 'Failed to list titles', 500);
    }
  }

  async getTitleWithDepartment(req, res) {
    try {
      const { id } = req.params;

      const title = await TitlesRepository.findByIdWithDepartment(id);
      if (!title) {
        return res.status(404).json({
          success: false,
          message: 'Title not found'
        });
      }

      res.json({
        success: true,
        message: 'Title with department retrieved successfully',
        data: title
      });
    } catch (error) {
      console.error('Error getting title with department:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get title with department',
        error: error.message
      });
    }
  }

  // POST /titles/get - Get titles with POST method
  async getTitlesPost(req, res) {
    try {
      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['title_name', 'created_at', 'updated_at'],
        defaultOrder: ['created_at', 'desc'],
        searchableColumns: ['title_name'],
        allowedFilters: ['title_name', 'department_id'],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await TitlesRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Titles retrieved successfully');

    } catch (error) {
      console.error('Error getting titles via POST:', error);
      return sendQueryError(res, 'Failed to get titles', 500);
    }
  }
}

module.exports = new TitlesHandler();
