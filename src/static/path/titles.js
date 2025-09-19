const titlesPaths = {
  '/titles/get': {
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
  '/titles': {
    get: {
      tags: ['Titles'],
      summary: 'Get titles',
      description: 'Get a paginated list of titles with optional filters',
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
          description: 'Search term for title name',
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
            enum: ['title_name', 'created_at', 'updated_at'],
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
          name: 'title_name',
          in: 'query',
          required: false,
          description: 'Filter by title name',
          schema: {
            type: 'string',
            maxLength: 100
          }
        },
        {
          name: 'department_id',
          in: 'query',
          required: false,
          description: 'Filter by department ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
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
  '/titles/{id}': {
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
  },
  '/titles/{id}/department': {
    get: {
      tags: ['Titles'],
      summary: 'Get title with department info',
      description: 'Get a specific title by its ID with department and company information',
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
          description: 'Title with department retrieved successfully',
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
