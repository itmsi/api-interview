const DepartmentsRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');

class DepartmentsHandler {
  async getDepartment(req, res) {
    try {
      const { id } = req.params;

      const department = await DepartmentsRepository.findById(id);
      if (!department) {
        return res.status(404).json({
          success: false,
          message: 'Department not found'
        });
      }

      res.json({
        success: true,
        message: 'Department retrieved successfully',
        data: department
      });
    } catch (error) {
      console.error('Error getting department:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get department',
        error: error.message
      });
    }
  }

  async listDepartments(req, res) {
    try {
      // Parse query parameters dengan konfigurasi standar
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['departments.department_name', 'departments.department_segmentasi', 'departments.created_at', 'departments.updated_at'],
        defaultOrder: ['departments.created_at', 'desc'],
        searchableColumns: ['departments.department_name', 'departments.department_segmentasi'],
        allowedFilters: ['departments.department_name', 'departments.department_segmentasi', 'departments.company_id']
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await DepartmentsRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Departments retrieved successfully');

    } catch (error) {
      console.error('Error listing departments:', error);
      return sendQueryError(res, 'Failed to list departments', 500);
    }
  }

  async getDepartmentWithCompany(req, res) {
    try {
      const { id } = req.params;

      const department = await DepartmentsRepository.findByIdWithCompany(id);
      if (!department) {
        return res.status(404).json({
          success: false,
          message: 'Department not found'
        });
      }

      res.json({
        success: true,
        message: 'Department with company retrieved successfully',
        data: department
      });
    } catch (error) {
      console.error('Error getting department with company:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get department with company',
        error: error.message
      });
    }
  }

  async getDepartmentWithChildren(req, res) {
    try {
      const { id } = req.params;

      const department = await DepartmentsRepository.findByIdWithChildren(id);
      if (!department) {
        return res.status(404).json({
          success: false,
          message: 'Department not found'
        });
      }

      res.json({
        success: true,
        message: 'Department with children retrieved successfully',
        data: department
      });
    } catch (error) {
      console.error('Error getting department with children:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get department with children',
        error: error.message
      });
    }
  }

  // POST /departments/get - Get departments with POST method
  async getDepartmentsPost(req, res) {
    try {
      // Map sort_by to include table prefix if needed
      if (req.body.sort_by && !req.body.sort_by.includes('.')) {
        const columnMapping = {
          'department_name': 'departments.department_name',
          'department_segmentasi': 'departments.department_segmentasi',
          'created_at': 'departments.created_at',
          'updated_at': 'departments.updated_at'
        };
        req.body.sort_by = columnMapping[req.body.sort_by] || req.body.sort_by;
      }

      // Map filter fields to include table prefix if needed
      if (req.body.department_name !== undefined && req.body['departments.department_name'] === undefined) {
        req.body['departments.department_name'] = req.body.department_name;
        delete req.body.department_name;
      }
      if (req.body.department_segmentasi !== undefined && req.body['departments.department_segmentasi'] === undefined) {
        req.body['departments.department_segmentasi'] = req.body.department_segmentasi;
        delete req.body.department_segmentasi;
      }
      if (req.body.company_id !== undefined && req.body['departments.company_id'] === undefined) {
        req.body['departments.company_id'] = req.body.company_id;
        delete req.body.company_id;
      }

      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['departments.department_name', 'departments.department_segmentasi', 'departments.created_at', 'departments.updated_at'],
        defaultOrder: ['departments.created_at', 'desc'],
        searchableColumns: ['departments.department_name', 'departments.department_segmentasi'],
        allowedFilters: ['departments.department_name', 'departments.department_segmentasi', 'departments.company_id'],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await DepartmentsRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Departments retrieved successfully');

    } catch (error) {
      console.error('Error getting departments via POST:', error);
      return sendQueryError(res, 'Failed to get departments', 500);
    }
  }
}

module.exports = new DepartmentsHandler();
