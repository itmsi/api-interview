const CompaniesHandler = require('./handler');

module.exports = {
  getCompany: CompaniesHandler.getCompany.bind(CompaniesHandler),
  listCompanies: CompaniesHandler.listCompanies.bind(CompaniesHandler),
  getCompanyWithChildren: CompaniesHandler.getCompanyWithChildren.bind(CompaniesHandler),
  getCompaniesPost: CompaniesHandler.getCompaniesPost.bind(CompaniesHandler),
};
