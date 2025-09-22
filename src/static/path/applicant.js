const applicantPaths = {
  '/applicants/get': {
    post: {
      tags: ['Applicants'],
      summary: 'Get applicants list with filters (POST method)',
      description: 'Retrieve a paginated list of applicants with filtering, sorting, and search capabilities using POST method',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetApplicantsRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Applicants retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ApplicantListResponse'
              }
            }
          }
        },
        400: {
          description: 'Bad request - validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - invalid token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  },
  '/applicants': {
    post: {
      tags: ['Applicants'],
      summary: 'Create new applicant',
      description: 'Create a new applicant with all related information (education, family, work experience, etc.)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateApplicantRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Applicant created successfully',
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
                    example: 'Applicant created successfully'
                  },
                  data: {
                    $ref: '#/components/schemas/ApplicantInformation'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request - validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - invalid token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  },
  '/applicants/{applicate_id}': {
    get: {
      tags: ['Applicants'],
      summary: 'Get applicant by ID',
      description: 'Retrieve a specific applicant by ID with all related information',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'applicate_id',
          in: 'path',
          description: 'Applicant ID',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Applicant retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ApplicantResponse'
              }
            }
          }
        },
        400: {
          description: 'Bad request - invalid ID format',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - invalid token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        404: {
          description: 'Applicant not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    },
    put: {
      tags: ['Applicants'],
      summary: 'Update applicant',
      description: 'Update an existing applicant with all related information',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'applicate_id',
          in: 'path',
          description: 'Applicant ID',
          required: true,
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
              $ref: '#/components/schemas/CreateApplicantRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Applicant updated successfully',
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
                    example: 'Applicant updated successfully'
                  },
                  data: {
                    $ref: '#/components/schemas/ApplicantInformation'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request - validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - invalid token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        404: {
          description: 'Applicant not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    },
    delete: {
      tags: ['Applicants'],
      summary: 'Delete applicant',
      description: 'Soft delete an applicant and all related information',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'applicate_id',
          in: 'path',
          description: 'Applicant ID',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Applicant deleted successfully',
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
                    example: 'Applicant deleted successfully'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request - invalid ID format',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized - invalid token',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        404: {
          description: 'Applicant not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  },
  '/public/applicants': {
    post: {
      tags: ['Public Applicants'],
      summary: 'Create new applicant (Public - No Authentication Required)',
      description: 'Create a new applicant with all related information without requiring authentication. This endpoint is designed for public job application submissions.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateApplicantRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Applicant created successfully',
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
                    example: 'Applicant created successfully'
                  },
                  data: {
                    $ref: '#/components/schemas/ApplicantInformation'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Bad request - validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  }
};

module.exports = applicantPaths;
