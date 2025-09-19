const express = require('express')
const auth = require('../../modules/auth')
const categories = require('../../modules/categories')
const companies = require('../../modules/companies')
const departments = require('../../modules/departments')
const titles = require('../../modules/titles')
const islands = require('../../modules/islands')
const genders = require('../../modules/genders')
const employees = require('../../modules/employees')
const candidates = require('../../modules/candidates')
const powerBi = require('../../modules/powerBi')
const dashboard = require('../../modules/dashboard')
const { verifyToken } = require('../../middlewares')
const { handleFileUpload, handleCandidateFileUpload } = require('../../middlewares/fileUpload')
const { 
  validateGetDashboardData, 
  validateGetRecentActivities, 
  validateGetRecentActivitiesPost,
  handleValidationErrors 
} = require('../../modules/dashboard/validation')

// Import validations for new modules
const { 
  validateGetCompany, 
  validateListCompanies, 
  validateListCompaniesPost, 
  handleValidationErrors: handleCompanyValidationErrors 
} = require('../../modules/companies/validation')
const { 
  validateGetDepartment, 
  validateListDepartments, 
  validateListDepartmentsPost, 
  handleValidationErrors: handleDepartmentValidationErrors 
} = require('../../modules/departments/validation')
const { 
  validateGetTitle, 
  validateListTitles, 
  validateListTitlesPost, 
  handleValidationErrors: handleTitleValidationErrors 
} = require('../../modules/titles/validation')
const { 
  validateGetIsland, 
  validateListIslands, 
  validateListIslandsPost, 
  handleValidationErrors: handleIslandValidationErrors 
} = require('../../modules/islands/validation')
const { 
  validateGetGender, 
  validateListGenders, 
  validateListGendersPost, 
  handleValidationErrors: handleGenderValidationErrors 
} = require('../../modules/genders/validation')
const { 
  validateGetEmployee, 
  validateListEmployees, 
  validateListEmployeesPost, 
  handleValidationErrors: handleEmployeeValidationErrors 
} = require('../../modules/employees/validation')
const { 
  validateCreateCandidate, 
  validateUpdateCandidate, 
  validateGetCandidate, 
  validateDeleteCandidate, 
  validateListCandidates, 
  validateListCandidatesPost, 
  handleValidationErrors: handleCandidateValidationErrors 
} = require('../../modules/candidates/validation')

const routing = express();
const API_TAG = '/api';

/* RULE
naming convention endpoint: using plural
*/

// Authentication routes
routing.use(`${API_TAG}/auth`, auth)

// Categories routes
routing.post(`${API_TAG}/categories/get`, verifyToken, categories.getCategoriesPost);
routing.post(`${API_TAG}/categories/create`, verifyToken, categories.createCategoryPost);
routing.post(`${API_TAG}/categories/:id/restore`, verifyToken, categories.restoreCategory);
routing.get(`${API_TAG}/categories/:id`, verifyToken, categories.getCategory);
routing.put(`${API_TAG}/categories/:id`, verifyToken, categories.updateCategory);
routing.delete(`${API_TAG}/categories/:id`, verifyToken, categories.deleteCategory);

// PowerBI routes
routing.post(`${API_TAG}/powerbi/get`, verifyToken, powerBi.getPowerBiPost);
routing.post(`${API_TAG}/powerbi/create`, verifyToken, handleFileUpload, powerBi.createPowerBiPost);
routing.post(`${API_TAG}/powerbi`, verifyToken, handleFileUpload, powerBi.createPowerBi);
routing.post(`${API_TAG}/powerbi/:id/restore`, verifyToken, powerBi.restorePowerBi);
routing.get(`${API_TAG}/powerbi`, verifyToken, powerBi.listPowerBi);
routing.get(`${API_TAG}/powerbi/:id`, verifyToken, powerBi.getPowerBi);
routing.get(`${API_TAG}/powerbi/category/:category_id`, verifyToken, powerBi.getPowerBiByCategory);
routing.get(`${API_TAG}/powerbi/stats/overview`, verifyToken, powerBi.getPowerBiStats);
routing.put(`${API_TAG}/powerbi/:id`, verifyToken, handleFileUpload, powerBi.updatePowerBi);
routing.delete(`${API_TAG}/powerbi/:id`, verifyToken, powerBi.deletePowerBi);

// Dashboard routes
routing.post(`${API_TAG}/dashboard`, verifyToken, validateGetDashboardData, handleValidationErrors, dashboard.getDashboardData);
routing.get(`${API_TAG}/dashboard/stats`, verifyToken, dashboard.getDashboardStats);
routing.post(`${API_TAG}/dashboard/stats`, verifyToken, dashboard.getDashboardStatsPost);
routing.get(`${API_TAG}/dashboard/activities`, verifyToken, validateGetRecentActivities, handleValidationErrors, dashboard.getRecentActivities);
routing.post(`${API_TAG}/dashboard/activities`, verifyToken, validateGetRecentActivitiesPost, handleValidationErrors, dashboard.getRecentActivitiesPost);

// Companies routes
routing.post(`${API_TAG}/companies/get`, verifyToken, validateListCompaniesPost, handleCompanyValidationErrors, companies.getCompaniesPost);
routing.get(`${API_TAG}/companies`, verifyToken, validateListCompanies, handleCompanyValidationErrors, companies.listCompanies);
routing.get(`${API_TAG}/companies/:id`, verifyToken, validateGetCompany, handleCompanyValidationErrors, companies.getCompany);
routing.get(`${API_TAG}/companies/:id/children`, verifyToken, validateGetCompany, handleCompanyValidationErrors, companies.getCompanyWithChildren);

// Departments routes
routing.post(`${API_TAG}/departments/get`, verifyToken, validateListDepartmentsPost, handleDepartmentValidationErrors, departments.getDepartmentsPost);
routing.get(`${API_TAG}/departments`, verifyToken, validateListDepartments, handleDepartmentValidationErrors, departments.listDepartments);
routing.get(`${API_TAG}/departments/:id`, verifyToken, validateGetDepartment, handleDepartmentValidationErrors, departments.getDepartment);
routing.get(`${API_TAG}/departments/:id/company`, verifyToken, validateGetDepartment, handleDepartmentValidationErrors, departments.getDepartmentWithCompany);
routing.get(`${API_TAG}/departments/:id/children`, verifyToken, validateGetDepartment, handleDepartmentValidationErrors, departments.getDepartmentWithChildren);

// Titles routes
routing.post(`${API_TAG}/titles/get`, verifyToken, validateListTitlesPost, handleTitleValidationErrors, titles.getTitlesPost);
routing.get(`${API_TAG}/titles`, verifyToken, validateListTitles, handleTitleValidationErrors, titles.listTitles);
routing.get(`${API_TAG}/titles/:id`, verifyToken, validateGetTitle, handleTitleValidationErrors, titles.getTitle);
routing.get(`${API_TAG}/titles/:id/department`, verifyToken, validateGetTitle, handleTitleValidationErrors, titles.getTitleWithDepartment);

// Islands routes
routing.post(`${API_TAG}/islands/get`, verifyToken, validateListIslandsPost, handleIslandValidationErrors, islands.getIslandsPost);
routing.get(`${API_TAG}/islands`, verifyToken, validateListIslands, handleIslandValidationErrors, islands.listIslands);
routing.get(`${API_TAG}/islands/:id`, verifyToken, validateGetIsland, handleIslandValidationErrors, islands.getIsland);

// Genders routes
routing.post(`${API_TAG}/genders/get`, verifyToken, validateListGendersPost, handleGenderValidationErrors, genders.getGendersPost);
routing.get(`${API_TAG}/genders`, verifyToken, validateListGenders, handleGenderValidationErrors, genders.listGenders);
routing.get(`${API_TAG}/genders/:id`, verifyToken, validateGetGender, handleGenderValidationErrors, genders.getGender);

// Employees routes
routing.post(`${API_TAG}/employees/get`, verifyToken, validateListEmployeesPost, handleEmployeeValidationErrors, employees.getEmployeesPost);
routing.get(`${API_TAG}/employees`, verifyToken, validateListEmployees, handleEmployeeValidationErrors, employees.listEmployees);
routing.get(`${API_TAG}/employees/:id`, verifyToken, validateGetEmployee, handleEmployeeValidationErrors, employees.getEmployee);
routing.get(`${API_TAG}/employees/:id/relations`, verifyToken, validateGetEmployee, handleEmployeeValidationErrors, employees.getEmployeeWithRelations);

// Candidates routes
routing.post(`${API_TAG}/candidates/get`, verifyToken, validateListCandidatesPost, handleCandidateValidationErrors, candidates.getCandidatesPost);
// Debug middleware
const debugMiddleware = (req, res, next) => {
  console.log('=== DEBUG MIDDLEWARE CALLED ===');
  console.log('req.files before middleware:', req.files);
  
  // Force error to test
  if (req.body.candidate_name === 'test11') {
    return res.status(500).json({ error: 'DEBUG: Middleware is running!' });
  }
  
  next();
};

routing.post(`${API_TAG}/candidates`, verifyToken, debugMiddleware, handleCandidateFileUpload, validateCreateCandidate, handleCandidateValidationErrors, candidates.createCandidate);
routing.post(`${API_TAG}/candidates/:id/restore`, verifyToken, validateGetCandidate, handleCandidateValidationErrors, candidates.restoreCandidate);
routing.get(`${API_TAG}/candidates`, verifyToken, validateListCandidates, handleCandidateValidationErrors, candidates.listCandidates);
routing.get(`${API_TAG}/candidates/:id`, verifyToken, validateGetCandidate, handleCandidateValidationErrors, candidates.getCandidate);
routing.get(`${API_TAG}/candidates/:id/relations`, verifyToken, validateGetCandidate, handleCandidateValidationErrors, candidates.getCandidateWithRelations);
routing.put(`${API_TAG}/candidates/:id`, verifyToken, handleCandidateFileUpload, validateUpdateCandidate, handleCandidateValidationErrors, candidates.updateCandidate);
routing.delete(`${API_TAG}/candidates/:id`, verifyToken, validateDeleteCandidate, handleCandidateValidationErrors, candidates.deleteCandidate);

module.exports = routing;
