const scheduleInterviewPaths = {
  '/schedule-interviews/get': {
    post: {
      tags: ['Schedule Interviews'],
      summary: 'Get schedule interviews via POST method',
      description: 'Get a paginated list of schedule interviews with optional filters using POST method. Parameters are sent in request body.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetScheduleInterviewsRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Schedule interviews retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ScheduleInterviewListResponse'
              }
            }
          }
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ScheduleInterviewErrorResponse'
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
  
  '/schedule-interviews/{id}': {
    get: {
      tags: ['Schedule Interviews'],
      summary: 'Get schedule interview by ID',
      description: 'Get a specific schedule interview by its ID with details',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Schedule Interview ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Schedule interview retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ScheduleInterviewResponse'
              }
            }
          }
        },
        404: {
          description: 'Schedule interview not found'
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
      tags: ['Schedule Interviews'],
      summary: 'Update schedule interview',
      description: 'Update an existing schedule interview. When employee_id is provided, it will replace all existing interview details.',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Schedule Interview ID',
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
              $ref: '#/components/schemas/ScheduleInterviewUpdate'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Schedule interview updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ScheduleInterviewResponse'
              }
            }
          }
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ScheduleInterviewErrorResponse'
              }
            }
          }
        },
        404: {
          description: 'Schedule interview not found'
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
      tags: ['Schedule Interviews'],
      summary: 'Delete schedule interview (soft delete)',
      description: 'Soft delete a schedule interview and all its related details',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Schedule Interview ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Schedule interview deleted successfully',
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
                    example: 'Schedule interview deleted successfully'
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'Schedule interview not found'
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
  
  '/schedule-interviews': {
    
    post: {
      tags: ['Schedule Interviews'],
      summary: 'Create new schedule interview',
      description: 'Create a new schedule interview. When employee_id is provided, it will create interview details for each employee.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ScheduleInterviewCreate'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Schedule interview created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ScheduleInterviewResponse'
              }
            }
          }
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ScheduleInterviewErrorResponse'
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
  
};

module.exports = scheduleInterviewPaths;
