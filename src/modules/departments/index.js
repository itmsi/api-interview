const DepartmentsHandler = require('./handler');

module.exports = {
  getDepartment: DepartmentsHandler.getDepartment.bind(DepartmentsHandler),
  listDepartments: DepartmentsHandler.listDepartments.bind(DepartmentsHandler),
  getDepartmentWithCompany: DepartmentsHandler.getDepartmentWithCompany.bind(DepartmentsHandler),
  getDepartmentWithChildren: DepartmentsHandler.getDepartmentWithChildren.bind(DepartmentsHandler),
  getDepartmentsPost: DepartmentsHandler.getDepartmentsPost.bind(DepartmentsHandler),
};
