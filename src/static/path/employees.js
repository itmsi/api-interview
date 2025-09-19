const employeesPaths = {
  '/employees/get': {
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
  '/employees/{id}': {
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
