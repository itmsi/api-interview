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
