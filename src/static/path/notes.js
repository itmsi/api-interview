const notesPaths = {
  '/notes/get': {
    post: {
      tags: ['Notes'],
      summary: 'Get notes via POST method',
      description: 'Get a paginated list of notes with optional filters using POST method. Parameters are sent in request body.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetNotesRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Notes retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/NoteListResponse'
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
  '/notes': {
    post: {
      tags: ['Notes'],
      summary: 'Create note',
      description: 'Create a new note for a candidate',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateNoteRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Note created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/NoteResponse'
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
  '/notes/{id}': {
    get: {
      tags: ['Notes'],
      summary: 'Get note by ID',
      description: 'Get a specific note by its ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Note ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Note retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/NoteResponse'
              }
            }
          }
        },
        404: {
          description: 'Note not found'
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
      tags: ['Notes'],
      summary: 'Update note',
      description: 'Update a specific note by its ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Note ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateNoteRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Note updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/NoteResponse'
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
        404: {
          description: 'Note not found'
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
  '/notes/delete': {
    delete: {
      tags: ['Notes'],
      summary: 'Delete note',
      description: 'Soft delete a specific note by its ID using request body',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/DeleteNoteRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Note deleted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean'
                  },
                  message: {
                    type: 'string'
                  }
                }
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
        404: {
          description: 'Note not found'
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

module.exports = notesPaths;
