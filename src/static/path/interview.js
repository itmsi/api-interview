const interviewPaths = {
  '/interviews/get': {
    post: {
      tags: ['Interviews'],
      summary: 'Get interviews via POST method',
      description: 'Get a paginated list of interviews with optional filters using POST method. Parameters are sent in request body.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetInterviewsRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Interviews retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InterviewListResponse'
              }
            }
          }
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InterviewErrorResponse'
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
  
  '/interviews/{id}': {
    get: {
      tags: ['Interviews'],
      summary: 'Get interview by ID',
      description: 'Get a specific interview by its ID with details including schedule interview info and interview details',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Interview ID',
          schema: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000'
          }
        }
      ],
      responses: {
        200: {
          description: 'Interview retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InterviewResponse'
              }
            }
          }
        },
        404: {
          description: 'Interview not found'
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
      tags: ['Interviews'],
      summary: 'Update interview',
      description: 'Update an existing interview and its details. If detail data (aspect, question, answer, score) is provided, it will update or create interview detail.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Interview ID',
          schema: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InterviewUpdate'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Interview updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InterviewResponse'
              }
            }
          }
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InterviewErrorResponse'
              }
            }
          }
        },
        404: {
          description: 'Interview not found'
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
      tags: ['Interviews'],
      summary: 'Delete interview (soft delete)',
      description: 'Soft delete an interview and all its related details',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Interview ID',
          schema: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000'
          }
        }
      ],
      responses: {
        200: {
          description: 'Interview deleted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  message: {
                    type: 'string',
                    example: 'Interview deleted successfully'
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'Interview not found'
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
  
  '/interviews': {
    post: {
      tags: ['Interviews'],
      summary: 'Create new interview',
      description: 'Create a new interview. When detail data (aspect, question, answer, score) is provided, it will also create interview detail.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InterviewCreate'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Interview created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InterviewResponse'
              }
            }
          }
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InterviewErrorResponse'
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

module.exports = interviewPaths;
