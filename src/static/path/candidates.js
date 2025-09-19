const candidatesPaths = {
  '/candidates/get': {
    post: {
      tags: ['Candidates'],
      summary: 'Get candidates via POST method',
      description: 'Get a paginated list of candidates with optional filters using POST method. Parameters are sent in request body.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GetCandidatesRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Candidates retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CandidateListResponse'
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
  '/candidates': {
    post: {
      tags: ['Candidates'],
      summary: 'Create candidate',
      description: 'Create a new candidate with optional file uploads (photo and resume)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: false,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                candidate_name: {
                  type: 'string',
                  maxLength: 255,
                  description: 'Candidate name'
                },
                candidate_email: {
                  type: 'string',
                  format: 'email',
                  maxLength: 255,
                  description: 'Candidate email'
                },
                candidate_phone: {
                  type: 'string',
                  maxLength: 50,
                  description: 'Candidate phone number'
                },
                candidate_religion: {
                  type: 'string',
                  maxLength: 100,
                  description: 'Candidate religion'
                },
                candidate_marital_status: {
                  type: 'string',
                  maxLength: 50,
                  description: 'Candidate marital status'
                },
                candidate_age: {
                  type: 'integer',
                  minimum: 0,
                  maximum: 120,
                  description: 'Candidate age'
                },
                candidate_date_birth: {
                  type: 'string',
                  format: 'date',
                  description: 'Candidate date of birth'
                },
                candidate_nationality: {
                  type: 'string',
                  maxLength: 100,
                  description: 'Candidate nationality'
                },
                candidate_city: {
                  type: 'string',
                  maxLength: 100,
                  description: 'Candidate city'
                },
                candidate_state: {
                  type: 'string',
                  maxLength: 100,
                  description: 'Candidate state'
                },
                candidate_country: {
                  type: 'string',
                  maxLength: 100,
                  description: 'Candidate country'
                },
                candidate_address: {
                  type: 'string',
                  maxLength: 1000,
                  description: 'Candidate address'
                },
                candidate_number: {
                  type: 'string',
                  maxLength: 100,
                  description: 'Candidate number'
                },
                company_id: {
                  type: 'string',
                  format: 'uuid',
                  description: 'Company ID'
                },
                departement_id: {
                  type: 'string',
                  format: 'uuid',
                  description: 'Department ID'
                },
                title_id: {
                  type: 'string',
                  format: 'uuid',
                  description: 'Title ID'
                },
                gender_id: {
                  type: 'string',
                  format: 'uuid',
                  description: 'Gender ID'
                },
                candidate_foto: {
                  type: 'string',
                  format: 'binary',
                  description: 'Candidate photo file (optional)'
                },
                candidate_resume: {
                  type: 'string',
                  format: 'binary',
                  description: 'Candidate resume file (optional)'
                }
              }
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Candidate created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CandidateResponse'
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
  '/candidates/{id}': {
    get: {
      tags: ['Candidates'],
      summary: 'Get candidate by ID',
      description: 'Get a specific candidate by its ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Candidate ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Candidate retrieved successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CandidateResponse'
              }
            }
          }
        },
        404: {
          description: 'Candidate not found'
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
      tags: ['Candidates'],
      summary: 'Update candidate',
      description: 'Update a specific candidate by its ID with optional file uploads',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Candidate ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      requestBody: {
        required: false,
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/UpdateCandidateRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Candidate updated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CandidateResponse'
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
          description: 'Candidate not found'
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
      tags: ['Candidates'],
      summary: 'Delete candidate',
      description: 'Soft delete a specific candidate by its ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Candidate ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      responses: {
        200: {
          description: 'Candidate deleted successfully',
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
        404: {
          description: 'Candidate not found'
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

module.exports = candidatesPaths;
