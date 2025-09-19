const islandsPaths = {
  '/islands/get': {
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
  '/islands/{id}': {
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
