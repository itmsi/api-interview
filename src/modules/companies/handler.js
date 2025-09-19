const CompaniesRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');

class CompaniesHandler {
  async getCompany(req, res) {
    try {
      const { id } = req.params;

      const company = await CompaniesRepository.findById(id);
      if (!company) {
        return res.status(404).json({
          success: false,
          message: 'Company not found'
        });
      }

      res.json({
        success: true,
        message: 'Company retrieved successfully',
        data: company
      });
    } catch (error) {
      console.error('Error getting company:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get company',
        error: error.message
      });
    }
  }

  async listCompanies(req, res) {
    try {
      // Parse query parameters dengan konfigurasi standar
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['company_name', 'company_email', 'created_at', 'updated_at'],
        defaultOrder: ['created_at', 'desc'],
        searchableColumns: ['company_name', 'company_email', 'company_address'],
        allowedFilters: ['company_name', 'company_email']
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await CompaniesRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Companies retrieved successfully');

    } catch (error) {
      console.error('Error listing companies:', error);
      return sendQueryError(res, 'Failed to list companies', 500);
    }
  }

  async getCompanyWithChildren(req, res) {
    try {
      const { id } = req.params;

      const company = await CompaniesRepository.findByIdWithChildren(id);
      if (!company) {
        return res.status(404).json({
          success: false,
          message: 'Company not found'
        });
      }

      res.json({
        success: true,
        message: 'Company with children retrieved successfully',
        data: company
      });
    } catch (error) {
      console.error('Error getting company with children:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get company with children',
        error: error.message
      });
    }
  }

  // POST /companies/get - Get companies with POST method
  async getCompaniesPost(req, res) {
    try {
      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['company_name', 'company_email', 'created_at', 'updated_at'],
        defaultOrder: ['created_at', 'desc'],
        searchableColumns: ['company_name', 'company_email', 'company_address'],
        allowedFilters: ['company_name', 'company_email'],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await CompaniesRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Companies retrieved successfully');

    } catch (error) {
      console.error('Error getting companies via POST:', error);
      return sendQueryError(res, 'Failed to get companies', 500);
    }
  }
}

module.exports = new CompaniesHandler();
