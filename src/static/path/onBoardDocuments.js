const onBoardDocumentsPaths = {
  '/on-board-documents/get': {
    post: {
      tags: ['On Board Documents'],
      summary: 'Get on board documents with POST method',
      description: 'Retrieve on board documents with filtering, pagination, and sorting using POST method',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetOnBoardDocumentsRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'On board documents retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/OnBoardDocumentListResponse'
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
  '/on-board-documents': {
    post: {
      tags: ['On Board Documents'],
      summary: 'Create on board document',
      description: 'Create a new on board document record',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/CreateOnBoardDocumentRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'On board document created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/OnBoardDocumentResponse'
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
  '/on-board-documents/{id}': {
    get: {
      tags: ['On Board Documents'],
      summary: 'Get on board document by ID',
      description: 'Retrieve a specific on board document by its ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'On board document ID'
        }
      ],
      responses: {
        200: {
          description: 'On board document retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/OnBoardDocumentResponse'
              }
            }
          }
        },
        404: {
          description: 'On board document not found'
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
      tags: ['On Board Documents'],
      summary: 'Update on board document',
      description: 'Update an existing on board document record',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'On board document ID'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/UpdateOnBoardDocumentRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'On board document updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/OnBoardDocumentResponse'
              }
            }
          }
        },
        404: {
          description: 'On board document not found'
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
      tags: ['On Board Documents'],
      summary: 'Delete on board document',
      description: 'Soft delete an on board document record',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'On board document ID'
        }
      ],
      responses: {
        200: {
          description: 'On board document deleted successfully',
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
          description: 'On board document not found'
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

module.exports = onBoardDocumentsPaths;
