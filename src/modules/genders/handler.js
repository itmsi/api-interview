const GendersRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');

class GendersHandler {
  async getGender(req, res) {
    try {
      const { id } = req.params;

      const gender = await GendersRepository.findById(id);
      if (!gender) {
        return res.status(404).json({
          success: false,
          message: 'Gender not found'
        });
      }

      res.json({
        success: true,
        message: 'Gender retrieved successfully',
        data: gender
      });
    } catch (error) {
      console.error('Error getting gender:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get gender',
        error: error.message
      });
    }
  }

  async listGenders(req, res) {
    try {
      // Parse query parameters dengan konfigurasi standar
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['gender_name', 'created_at', 'updated_at'],
        defaultOrder: ['created_at', 'desc'],
        searchableColumns: ['gender_name'],
        allowedFilters: ['gender_name']
      });

      // Validasi query parameters

      // Get data dengan filter dan pagination
      const result = await GendersRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Genders retrieved successfully');

    } catch (error) {
      console.error('Error listing genders:', error);
      return sendQueryError(res, 'Failed to list genders', 500);
    }
  }

  // POST /genders/get - Get genders with POST method
  async getGendersPost(req, res) {
    try {
      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['gender_name', 'created_at', 'updated_at'],
        defaultOrder: ['created_at', 'desc'],
        searchableColumns: ['gender_name'],
        allowedFilters: ['gender_name'],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters

      // Get data dengan filter dan pagination
      const result = await GendersRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Genders retrieved successfully');

    } catch (error) {
      console.error('Error getting genders via POST:', error);
      return sendQueryError(res, 'Failed to get genders', 500);
    }
  }
}

module.exports = new GendersHandler();
