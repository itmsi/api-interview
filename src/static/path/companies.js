const companiesPaths = {
  '/interview/companies': {
    get: {
      tags: ['Companies'],
      summary: 'List companies',
      description: 'Get a list of companies with optional filters',
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
  '/interview/companies/get': {
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
  '/interview/companies/{id}': {
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
  }
};

module.exports = companiesPaths;
