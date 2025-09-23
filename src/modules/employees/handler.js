const EmployeesRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');

class EmployeesHandler {
  async getEmployee(req, res) {
    try {
      const { id } = req.params;

      const employee = await EmployeesRepository.findById(id);
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found'
        });
      }

      res.json({
        success: true,
        message: 'Employee retrieved successfully',
        data: employee
      });
    } catch (error) {
      console.error('Error getting employee:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get employee',
        error: error.message
      });
    }
  }

  async listEmployees(req, res) {
    try {
      // Parse query parameters dengan konfigurasi standar
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['employee_name', 'employee_email', 'employee_mobile', 'employee_activation_status', 'created_at', 'updated_at'],
        defaultOrder: ['created_at', 'desc'],
        searchableColumns: ['employee_name', 'employee_email', 'employee_mobile', 'employee_address'],
        allowedFilters: ['employee_name', 'employee_email', 'title_id', 'department_id', 'gender_id', 'island_id', 'employee_activation_status', 'employee_disabled']
      });

      // Get data dengan filter dan pagination
      const result = await EmployeesRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Employees retrieved successfully');

    } catch (error) {
      console.error('Error listing employees:', error);
      return sendQueryError(res, 'Failed to list employees', 500);
    }
  }

  async getEmployeeWithRelations(req, res) {
    try {
      const { id } = req.params;

      const employee = await EmployeesRepository.findByIdWithRelations(id);
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found'
        });
      }

      res.json({
        success: true,
        message: 'Employee with relations retrieved successfully',
        data: employee
      });
    } catch (error) {
      console.error('Error getting employee with relations:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get employee with relations',
        error: error.message
      });
    }
  }

  // POST /employees/get - Get employees with POST method
  async getEmployeesPost(req, res) {
    try {
      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['employee_name', 'employee_email', 'employee_mobile', 'employee_activation_status', 'created_at', 'updated_at'],
        defaultOrder: ['created_at', 'desc'],
        searchableColumns: ['employee_name', 'employee_email', 'employee_mobile', 'employee_address'],
        allowedFilters: ['employee_name', 'employee_email', 'title_id', 'department_id', 'gender_id', 'island_id', 'employee_activation_status', 'employee_disabled'],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Get data dengan filter dan pagination
      const result = await EmployeesRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Employees retrieved successfully');

    } catch (error) {
      console.error('Error getting employees via POST:', error);
      return sendQueryError(res, 'Failed to get employees', 500);
    }
  }
}

module.exports = new EmployeesHandler();
