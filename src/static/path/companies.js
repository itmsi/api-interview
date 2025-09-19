const companiesPaths = {
  '/companies/get': {
    post: {
      tags: ['Companies'],
      summary: 'Get companies via POST method',
      description: 'Get a paginated list of companies with optional filters using POST method. Parameters are sent in request body.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetCompaniesRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Companies retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CompanyListResponse'
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
  '/companies': {
    get: {
      tags: ['Companies'],
      summary: 'Get companies',
      description: 'Get a paginated list of companies with optional filters',
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
          description: 'Search term for company name, email, or address',
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
            enum: ['company_name', 'company_email', 'created_at', 'updated_at'],
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
          name: 'company_name',
          in: 'query',
          required: false,
          description: 'Filter by company name',
          schema: {
            type: 'string',
            maxLength: 100
          }
        },
        {
          name: 'company_email',
          in: 'query',
          required: false,
          description: 'Filter by company email',
          schema: {
            type: 'string',
            format: 'email',
            maxLength: 100
          }
        }
      ],
      responses: {
        200: {
          description: 'Companies retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CompanyListResponse'
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
  '/companies/{id}': {
    get: {
      tags: ['Companies'],
      summary: 'Get company by ID',
      description: 'Get a specific company by its ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Company ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Company retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CompanyResponse'
              }
            }
          }
        },
        404: {
          description: 'Company not found'
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
  '/companies/{id}/children': {
    get: {
      tags: ['Companies'],
      summary: 'Get company with children count',
      description: 'Get a specific company by its ID with children count',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Company ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Company with children retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CompanyResponse'
              }
            }
          }
        },
        404: {
          description: 'Company not found'
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

module.exports = companiesPaths;
