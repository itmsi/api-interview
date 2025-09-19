const candidatesSchema = {
  Candidate: {
    type: 'object',
    properties: {
      candidate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the candidate'
      },
      candidate_name: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Candidate name'
      },
      candidate_email: {
        type: 'string',
        format: 'email',
        maxLength: 255,
        nullable: true,
        description: 'Candidate email'
      },
      candidate_phone: {
        type: 'string',
        maxLength: 50,
        nullable: true,
        description: 'Candidate phone number'
      },
      candidate_religion: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'Candidate religion'
      },
      candidate_marital_status: {
        type: 'string',
        maxLength: 50,
        nullable: true,
        description: 'Candidate marital status'
      },
      candidate_age: {
        type: 'integer',
        minimum: 0,
        maximum: 120,
        nullable: true,
        description: 'Candidate age'
      },
      candidate_date_birth: {
        type: 'string',
        format: 'date',
        nullable: true,
        description: 'Candidate date of birth'
      },
      candidate_nationality: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'Candidate nationality'
      },
      candidate_city: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'Candidate city'
      },
      candidate_state: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'Candidate state'
      },
      candidate_country: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'Candidate country'
      },
      candidate_address: {
        type: 'string',
        maxLength: 1000,
        nullable: true,
        description: 'Candidate address'
      },
      candidate_foto: {
        type: 'string',
        nullable: true,
        description: 'Candidate photo URL'
      },
      candidate_resume: {
        type: 'string',
        nullable: true,
        description: 'Candidate resume URL'
      },
      candidate_number: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'Candidate number'
      },
      company_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Company ID'
      },
      departement_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Department ID'
      },
      title_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Title ID'
      },
      gender_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Gender ID'
      },
      create_at: {
        type: 'string',
        format: 'date-time',
        description: 'Creation timestamp'
      },
      create_by: {
        type: 'string',
        nullable: true,
        description: 'User who created the candidate'
      },
      update_at: {
        type: 'string',
        format: 'date-time',
        description: 'Last update timestamp'
      },
      update_by: {
        type: 'string',
        nullable: true,
        description: 'User who last updated the candidate'
      },
      delete_at: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'Deletion timestamp'
      },
      delete_by: {
        type: 'string',
        nullable: true,
        description: 'User who deleted the candidate'
      },
      is_delete: {
        type: 'boolean',
        description: 'Soft delete flag'
      },
      company_name: {
        type: 'string',
        description: 'Company name (when joined with companies table)'
      },
      department_name: {
        type: 'string',
        description: 'Department name (when joined with departments table)'
      },
      title_name: {
        type: 'string',
        description: 'Title name (when joined with titles table)'
      },
      gender_name: {
        type: 'string',
        description: 'Gender name (when joined with genders table)'
      }
    },
    required: ['candidate_id', 'create_at', 'update_at', 'is_delete']
  },
  CreateCandidateRequest: {
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
        description: 'Candidate photo file'
      },
      candidate_resume: {
        type: 'string',
        format: 'binary',
        description: 'Candidate resume file'
      }
    }
  },
  GetCandidatesRequest: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
        description: 'Page number'
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 10,
        description: 'Items per page'
      },
      search: {
        type: 'string',
        maxLength: 100,
        description: 'Search term for candidate name, email, phone, city, or country'
      },
      sort_by: {
        type: 'string',
        enum: ['candidate_name', 'candidate_email', 'candidate_phone', 'candidate_age', 'create_at', 'update_at'],
        default: 'create_at',
        description: 'Sort field'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order'
      },
      candidate_name: {
        type: 'string',
        maxLength: 255,
        description: 'Filter by candidate name'
      },
      candidate_email: {
        type: 'string',
        format: 'email',
        maxLength: 255,
        description: 'Filter by candidate email'
      },
      company_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by company ID'
      },
      departement_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by department ID'
      },
      title_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by title ID'
      },
      gender_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by gender ID'
      },
      candidate_city: {
        type: 'string',
        maxLength: 100,
        description: 'Filter by candidate city'
      },
      candidate_country: {
        type: 'string',
        maxLength: 100,
        description: 'Filter by candidate country'
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: '',
      sort_by: 'candidate_name',
      sort_order: 'asc',
      candidate_name: '',
      candidate_email: '',
      company_id: '',
      departement_id: '',
      title_id: '',
      gender_id: '',
      candidate_city: '',
      candidate_country: ''
    }
  },
  UpdateCandidateRequest: {
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
        description: 'Candidate photo file'
      },
      candidate_resume: {
        type: 'string',
        format: 'binary',
        description: 'Candidate resume file'
      }
    }
  },
  CandidateListResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        description: 'Request success status'
      },
      message: {
        type: 'string',
        description: 'Response message'
      },
      data: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Candidate'
        }
      },
      pagination: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            description: 'Current page number'
          },
          limit: {
            type: 'integer',
            description: 'Items per page'
          },
          total: {
            type: 'integer',
            description: 'Total number of items'
          },
          totalPages: {
            type: 'integer',
            description: 'Total number of pages'
          }
        }
      }
    }
  },
  CandidateResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        description: 'Request success status'
      },
      message: {
        type: 'string',
        description: 'Response message'
      },
      data: {
        $ref: '#/components/schemas/Candidate'
      }
    }
  },
  ErrorResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        description: 'Request success status'
      },
      message: {
        type: 'string',
        description: 'Error message'
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            field: {
              type: 'string',
              description: 'Field name with error'
            },
            message: {
              type: 'string',
              description: 'Error message'
            }
          }
        }
      }
    }
  }
};

module.exports = candidatesSchema;
