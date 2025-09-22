const gendersPaths = {
  '/interview/genders': {
    get: {
      tags: ['Genders'],
      summary: 'List genders',
      description: 'Get a list of genders with optional filters',
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
  '/interview/genders/get': {
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
  '/interview/genders/{id}': {
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
