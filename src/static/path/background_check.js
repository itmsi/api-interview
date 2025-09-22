const backgroundCheckPaths = {
  '/background-checks/get': {
    post: {
      tags: ['Background Check'],
      summary: 'Get background checks with POST method',
      description: 'Retrieve background checks with filtering, pagination, and sorting using POST method',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetBackgroundChecksRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Background checks retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BackgroundCheckListResponse'
              }
            }
          }
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
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
  '/background-checks': {
    post: {
      tags: ['Background Check'],
      summary: 'Create background check',
      description: 'Create a new background check record',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/CreateBackgroundCheckRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Background check created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BackgroundCheckResponse'
              }
            }
          }
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
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
  '/background-checks/{id}': {
    get: {
      tags: ['Background Check'],
      summary: 'Get background check by ID',
      description: 'Retrieve a specific background check by its ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Background check ID'
        }
      ],
      responses: {
        200: {
          description: 'Background check retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BackgroundCheckResponse'
              }
            }
          }
        },
        404: {
          description: 'Background check not found'
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
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
    },
    put: {
      tags: ['Background Check'],
      summary: 'Update background check',
      description: 'Update an existing background check record',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Background check ID'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/UpdateBackgroundCheckRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Background check updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BackgroundCheckResponse'
              }
            }
          }
        },
        404: {
          description: 'Background check not found'
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
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
    },
    delete: {
      tags: ['Background Check'],
      summary: 'Delete background check',
      description: 'Soft delete a background check record',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Background check ID'
        }
      ],
      responses: {
        200: {
          description: 'Background check deleted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' }
                }
              }
            }
          }
        },
        404: {
          description: 'Background check not found'
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
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
  }
};

module.exports = backgroundCheckPaths;
