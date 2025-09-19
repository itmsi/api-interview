const gendersPaths = {
  '/genders/get': {
    post: {
      tags: ['Genders'],
      summary: 'Get genders via POST method',
      description: 'Get a paginated list of genders with optional filters using POST method. Parameters are sent in request body.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetGendersRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Genders retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GenderListResponse'
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
  '/genders': {
    get: {
      tags: ['Genders'],
      summary: 'Get genders',
      description: 'Get a paginated list of genders with optional filters',
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
          description: 'Search term for gender name',
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
            enum: ['gender_name', 'created_at', 'updated_at'],
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
          name: 'gender_name',
          in: 'query',
          required: false,
          description: 'Filter by gender name',
          schema: {
            type: 'string',
            maxLength: 50
          }
        }
      ],
      responses: {
        200: {
          description: 'Genders retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GenderListResponse'
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
  '/genders/{id}': {
    get: {
      tags: ['Genders'],
      summary: 'Get gender by ID',
      description: 'Get a specific gender by its ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Gender ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Gender retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GenderResponse'
              }
            }
          }
        },
        404: {
          description: 'Gender not found'
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

module.exports = gendersPaths;
