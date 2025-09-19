const info = {
  description: 'Report Management SSO Client API - Made with ❤ by <a href="https://github.com/abdulfalaq5" target="_blank">@abdulfalaq5.</a>',
  version: '1.0.0',
  title: 'Report Management SSO Client API Documentation',
  contact: {
    email: ''
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT'
  }
}

const servers = [
  {
    url: '/api/',
    description: 'Development server'
  },
  {
    url: 'https://services.motorsights.com/api/',
    description: 'Gateway server'
  }
]

// Import schemas
const categoriesSchema = require('./schema/categories');
const companiesSchema = require('./schema/companies');
const departmentsSchema = require('./schema/departments');
const titlesSchema = require('./schema/titles');
const islandsSchema = require('./schema/islands');
const gendersSchema = require('./schema/genders');
const employeesSchema = require('./schema/employees');
// const powerBiSchema = require('./schema/powerBi');
// const dashboardSchema = require('./schema/dashboard');

// Import paths
const categoriesPaths = require('./path/categories');
const companiesPaths = require('./path/companies');
const departmentsPaths = require('./path/departments');
const titlesPaths = require('./path/titles');
const islandsPaths = require('./path/islands');
const gendersPaths = require('./path/genders');
const employeesPaths = require('./path/employees');
// const powerBiPaths = require('./path/powerBi');
// const dashboardPaths = require('./path/dashboard');

// Combine all schemas
const schemas = {
  ...categoriesSchema,
  ...companiesSchema,
  ...departmentsSchema,
  ...titlesSchema,
  ...islandsSchema,
  ...gendersSchema,
  ...employeesSchema
};

// Combine all paths
const paths = {
  ...categoriesPaths,
  ...companiesPaths,
  ...departmentsPaths,
  ...titlesPaths,
  ...islandsPaths,
  ...gendersPaths,
  ...employeesPaths
};

const index = {
  openapi: '3.0.0',
  info,
  servers,
  paths,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas
  }
}

module.exports = {
  index
}
