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
        allowedColumns: ['titles.title_name', 'titles.created_at', 'titles.updated_at'],
        defaultOrder: ['titles.created_at', 'desc'],
        searchableColumns: ['titles.title_name'],
        allowedFilters: ['titles.title_name', 'titles.department_id']
      });

      // Validasi query parameters

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
      // Map sort_by to include table prefix if needed
      if (req.body.sort_by && !req.body.sort_by.includes('.')) {
        const columnMapping = {
          'title_name': 'titles.title_name',
          'created_at': 'titles.created_at',
          'updated_at': 'titles.updated_at'
        };
        req.body.sort_by = columnMapping[req.body.sort_by] || req.body.sort_by;
      }

      // Map filter fields to include table prefix if needed
      if (req.body.title_name !== undefined && req.body['titles.title_name'] === undefined) {
        req.body['titles.title_name'] = req.body.title_name;
        delete req.body.title_name;
      }
      if (req.body.department_id !== undefined && req.body['titles.department_id'] === undefined) {
        req.body['titles.department_id'] = req.body.department_id;
        delete req.body.department_id;
      }

      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['titles.title_name', 'titles.created_at', 'titles.updated_at'],
        defaultOrder: ['titles.created_at', 'desc'],
        searchableColumns: ['titles.title_name'],
        allowedFilters: ['titles.title_name', 'titles.department_id'],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters

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
