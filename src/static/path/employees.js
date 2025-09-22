const employeesPaths = {
  '/interview/employees': {
    get: {
      tags: ['Employees'],
      summary: 'List employees',
      description: 'Get a list of employees with optional filters',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'page',
          in: 'query',
          required: false,
          description: 'Page number',
          schema: {
            type: 'integer',
            minimum: 1,
            default: 1
          }
        },
        {
          name: 'limit',
          in: 'query',
          required: false,
          description: 'Number of items per page',
          schema: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
            default: 10
          }
        }
      ],
      responses: {
        200: {
          description: 'Employees retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/EmployeeListResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized'
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  },
  '/interview/employees/get': {
    post: {
      tags: ['Employees'],
      summary: 'Get employees via POST method',
      description: 'Get a paginated list of employees with optional filters using POST method. Parameters are sent in request body.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetEmployeesRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Employees retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/EmployeeListResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized'
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  },
  '/interview/employees/{id}': {
    get: {
      tags: ['Employees'],
      summary: 'Get employee by ID',
      description: 'Get a specific employee by its ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Employee ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Employee retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/EmployeeResponse'
              }
            }
          }
        },
        404: {
          description: 'Employee not found'
        },
        401: {
          description: 'Unauthorized'
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  }
};

module.exports = employeesPaths;
