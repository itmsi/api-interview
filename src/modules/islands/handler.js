const IslandsRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');

class IslandsHandler {
  async getIsland(req, res) {
    try {
      const { id } = req.params;

      const island = await IslandsRepository.findById(id);
      if (!island) {
        return res.status(404).json({
          success: false,
          message: 'Island not found'
        });
      }

      res.json({
        success: true,
        message: 'Island retrieved successfully',
        data: island
      });
    } catch (error) {
      console.error('Error getting island:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get island',
        error: error.message
      });
    }
  }

  async listIslands(req, res) {
    try {
      // Parse query parameters dengan konfigurasi standar
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['island_name', 'created_at', 'updated_at'],
        defaultOrder: ['created_at', 'desc'],
        searchableColumns: ['island_name'],
        allowedFilters: ['island_name']
      });

      // Validasi query parameters

      // Get data dengan filter dan pagination
      const result = await IslandsRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Islands retrieved successfully');

    } catch (error) {
      console.error('Error listing islands:', error);
      return sendQueryError(res, 'Failed to list islands', 500);
    }
  }

  // POST /islands/get - Get islands with POST method
  async getIslandsPost(req, res) {
    try {
      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['island_name', 'created_at', 'updated_at'],
        defaultOrder: ['created_at', 'desc'],
        searchableColumns: ['island_name'],
        allowedFilters: ['island_name'],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters

      // Get data dengan filter dan pagination
      const result = await IslandsRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Islands retrieved successfully');

    } catch (error) {
      console.error('Error getting islands via POST:', error);
      return sendQueryError(res, 'Failed to get islands', 500);
    }
  }
}

module.exports = new IslandsHandler();
