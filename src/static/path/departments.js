const departmentsPaths = {
  '/departments/get': {
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
  '/departments': {
    get: {
      tags: ['Departments'],
      summary: 'Get departments',
      description: 'Get a paginated list of departments with optional filters',
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
          description: 'Search term for department name or segmentation',
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
            enum: ['department_name', 'department_segmentasi', 'created_at', 'updated_at'],
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
          name: 'department_name',
          in: 'query',
          required: false,
          description: 'Filter by department name',
          schema: {
            type: 'string',
            maxLength: 100
          }
        },
        {
          name: 'department_segmentasi',
          in: 'query',
          required: false,
          description: 'Filter by department segmentation',
          schema: {
            type: 'string',
            maxLength: 100
          }
        },
        {
          name: 'company_id',
          in: 'query',
          required: false,
          description: 'Filter by company ID',
          schema: {
            type: 'string',
            format: 'uuid'
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
  '/departments/{id}': {
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
  },
  '/departments/{id}/company': {
    get: {
      tags: ['Departments'],
      summary: 'Get department with company info',
      description: 'Get a specific department by its ID with company information',
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
          description: 'Department with company retrieved successfully',
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
  },
  '/departments/{id}/children': {
    get: {
      tags: ['Departments'],
      summary: 'Get department with children count',
      description: 'Get a specific department by its ID with children count',
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
          description: 'Department with children retrieved successfully',
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
