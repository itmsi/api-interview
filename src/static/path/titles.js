const titlesPaths = {
  '/interview/titles/get': {
    post: {
      tags: ['Titles'],
      summary: 'Get titles via POST method',
      description: 'Get a paginated list of titles with optional filters using POST method. Parameters are sent in request body.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetTitlesRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Titles retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TitleListResponse'
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
  '/interview/titles/{id}': {
    get: {
      tags: ['Titles'],
      summary: 'Get title by ID',
      description: 'Get a specific title by its ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Title ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Title retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TitleResponse'
              }
            }
          }
        },
        404: {
          description: 'Title not found'
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

module.exports = titlesPaths;
