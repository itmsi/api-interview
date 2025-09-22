const departmentsPaths = {
  '/interview/departments': {
    get: {
      tags: ['Departments'],
      summary: 'List departments',
      description: 'Get a list of departments with optional filters',
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
          description: 'Departments retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DepartmentListResponse'
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
  '/interview/departments/get': {
    post: {
      tags: ['Departments'],
      summary: 'Get departments via POST method',
      description: 'Get a paginated list of departments with optional filters using POST method. Parameters are sent in request body.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetDepartmentsRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Departments retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DepartmentListResponse'
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
  '/interview/departments/{id}': {
    get: {
      tags: ['Departments'],
      summary: 'Get department by ID',
      description: 'Get a specific department by its ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Department ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Department retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DepartmentResponse'
              }
            }
          }
        },
        404: {
          description: 'Department not found'
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

module.exports = departmentsPaths;
