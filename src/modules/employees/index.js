const EmployeesHandler = require('./handler');

module.exports = {
  getEmployee: EmployeesHandler.getEmployee.bind(EmployeesHandler),
  listEmployees: EmployeesHandler.listEmployees.bind(EmployeesHandler),
  getEmployeeWithRelations: EmployeesHandler.getEmployeeWithRelations.bind(EmployeesHandler),
  getEmployeesPost: EmployeesHandler.getEmployeesPost.bind(EmployeesHandler),
};
