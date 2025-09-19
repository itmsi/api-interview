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
  '/employees': {
    get: {
      tags: ['Employees'],
      summary: 'Get employees',
      description: 'Get a paginated list of employees with optional filters',
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
          description: 'Items per page',
          schema: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
            default: 10
          }
        },
        {
          name: 'search',
          in: 'query',
          required: false,
          description: 'Search term for employee name, email, mobile, or address',
          schema: {
            type: 'string',
            maxLength: 100
          }
        },
        {
          name: 'sort_by',
          in: 'query',
          required: false,
          description: 'Sort field',
          schema: {
            type: 'string',
            enum: ['employee_name', 'employee_email', 'employee_mobile', 'employee_activation_status', 'created_at', 'updated_at'],
            default: 'created_at'
          }
        },
        {
          name: 'sort_order',
          in: 'query',
          required: false,
          description: 'Sort order',
          schema: {
            type: 'string',
            enum: ['asc', 'desc'],
            default: 'desc'
          }
        },
        {
          name: 'employee_name',
          in: 'query',
          required: false,
          description: 'Filter by employee name',
          schema: {
            type: 'string',
            maxLength: 100
          }
        },
        {
          name: 'employee_email',
          in: 'query',
          required: false,
          description: 'Filter by employee email',
          schema: {
            type: 'string',
            format: 'email',
            maxLength: 100
          }
        },
        {
          name: 'title_id',
          in: 'query',
          required: false,
          description: 'Filter by title ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        },
        {
          name: 'department_id',
          in: 'query',
          required: false,
          description: 'Filter by department ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        },
        {
          name: 'gender_id',
          in: 'query',
          required: false,
          description: 'Filter by gender ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        },
        {
          name: 'island_id',
          in: 'query',
          required: false,
          description: 'Filter by island ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        },
        {
          name: 'employee_activation_status',
          in: 'query',
          required: false,
          description: 'Filter by activation status',
          schema: {
            type: 'string',
            maxLength: 50
          }
        },
        {
          name: 'employee_disabled',
          in: 'query',
          required: false,
          description: 'Filter by disabled status',
          schema: {
            type: 'boolean'
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
  },
  '/employees/{id}/relations': {
    get: {
      tags: ['Employees'],
      summary: 'Get employee with all relations',
      description: 'Get a specific employee by its ID with all related information (title, department, company, gender, island)',
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
          description: 'Employee with relations retrieved successfully',
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
