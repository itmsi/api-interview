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
  }
};

module.exports = companiesPaths;
