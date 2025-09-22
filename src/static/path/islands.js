const islandsPaths = {
  '/interview/islands': {
    get: {
      tags: ['Islands'],
      summary: 'List islands',
      description: 'Get a list of islands with optional filters',
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
          description: 'Islands retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/IslandListResponse'
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
  '/interview/islands/get': {
    post: {
      tags: ['Islands'],
      summary: 'Get islands via POST method',
      description: 'Get a paginated list of islands with optional filters using POST method. Parameters are sent in request body.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetIslandsRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Islands retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/IslandListResponse'
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
  '/interview/islands/{id}': {
    get: {
      tags: ['Islands'],
      summary: 'Get island by ID',
      description: 'Get a specific island by its ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Island ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Island retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/IslandResponse'
              }
            }
          }
        },
        404: {
          description: 'Island not found'
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

module.exports = islandsPaths;
