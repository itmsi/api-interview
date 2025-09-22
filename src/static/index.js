const info = {
  description: 'Interview Management API - Made with ❤ by <a href="https://github.com/abdulfalaq5" target="_blank">@abdulfalaq5.</a>',
  version: '1.0.0',
  title: 'Interview Management API Documentation',
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
const companiesSchema = require('./schema/companies');
const departmentsSchema = require('./schema/departments');
const titlesSchema = require('./schema/titles');
const islandsSchema = require('./schema/islands');
const gendersSchema = require('./schema/genders');
const employeesSchema = require('./schema/employees');
const candidatesSchema = require('./schema/candidates');
const notesSchema = require('./schema/notes');
const scheduleInterviewSchema = require('./schema/scheduleInterview');
const interviewSchema = require('./schema/interview');
const applicantSchema = require('./schema/applicant');
const backgroundCheckSchema = require('./schema/background_check');

// Import paths
const companiesPaths = require('./path/companies');
const departmentsPaths = require('./path/departments');
const titlesPaths = require('./path/titles');
const islandsPaths = require('./path/islands');
const gendersPaths = require('./path/genders');
const employeesPaths = require('./path/employees');
const candidatesPaths = require('./path/candidates');
const notesPaths = require('./path/notes');
const scheduleInterviewPaths = require('./path/scheduleInterview');
const interviewPaths = require('./path/interview');
const applicantPaths = require('./path/applicant');
const backgroundCheckPaths = require('./path/background_check');

// Combine all schemas
const schemas = {
  ...companiesSchema,
  ...departmentsSchema,
  ...titlesSchema,
  ...islandsSchema,
  ...gendersSchema,
  ...employeesSchema,
  ...candidatesSchema,
  ...notesSchema,
  ...scheduleInterviewSchema,
  ...interviewSchema,
  ...applicantSchema,
  ...backgroundCheckSchema
};

// Combine all paths
const paths = {
  ...companiesPaths,
  ...departmentsPaths,
  ...titlesPaths,
  ...islandsPaths,
  ...gendersPaths,
  ...employeesPaths,
  ...candidatesPaths,
  ...notesPaths,
  ...scheduleInterviewPaths,
  ...interviewPaths,
  ...applicantPaths,
  ...backgroundCheckPaths
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
