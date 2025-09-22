const onBoardDocumentsSchema = {
  OnBoardDocument: {
    type: 'object',
    properties: {
      on_board_documents_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the on board document'
      },
      candidate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Candidate ID'
      },
      on_board_documents_name: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'On board document name'
      },
      on_board_documents_file: {
        type: 'string',
        maxLength: 500,
        nullable: true,
        description: 'On board document file URL'
      },
      create_at: {
        type: 'string',
        format: 'date-time',
        description: 'Creation timestamp'
      },
      create_by: {
        type: 'string',
        nullable: true,
        description: 'User who created the on board document'
      },
      update_at: {
        type: 'string',
        format: 'date-time',
        description: 'Last update timestamp'
      },
      update_by: {
        type: 'string',
        nullable: true,
        description: 'User who last updated the on board document'
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
        description: 'User who deleted the on board document'
      },
      candidate_name: {
        type: 'string',
        description: 'Candidate name (when joined with candidates table)'
      },
      candidate_email: {
        type: 'string',
        description: 'Candidate email (when joined with candidates table)'
      },
      candidate_phone: {
        type: 'string',
        description: 'Candidate phone (when joined with candidates table)'
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
      }
    },
    required: ['on_board_documents_id', 'candidate_id', 'create_at', 'update_at']
  },
  CreateOnBoardDocumentRequest: {
    type: 'object',
    properties: {
      candidate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Candidate ID'
      },
      on_board_documents_name: {
        type: 'string',
        maxLength: 255,
        description: 'On board document name'
      },
      on_board_documents_file: {
        type: 'string',
        format: 'binary',
        description: 'On board document file'
      }
    },
    required: ['candidate_id']
  },
  GetOnBoardDocumentsRequest: {
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
        description: 'Search term for document name, candidate name, email, company, or department'
      },
      sort_by: {
        type: 'string',
        enum: ['on_board_documents_name', 'create_at', 'update_at'],
        default: 'create_at',
        description: 'Sort field'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order'
      },
      candidate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by candidate ID'
      },
      on_board_documents_name: {
        type: 'string',
        maxLength: 255,
        description: 'Filter by on board document name'
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
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: '',
      sort_by: 'create_at',
      sort_order: 'desc',
      candidate_id: '',
      on_board_documents_name: ''
    }
  },
  UpdateOnBoardDocumentRequest: {
    type: 'object',
    properties: {
      on_board_documents_name: {
        type: 'string',
        maxLength: 255,
        description: 'On board document name'
      },
      on_board_documents_file: {
        type: 'string',
        format: 'binary',
        description: 'On board document file'
      }
    }
  },
  OnBoardDocumentListResponse: {
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
          $ref: '#/components/schemas/OnBoardDocument'
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
  OnBoardDocumentResponse: {
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
        $ref: '#/components/schemas/OnBoardDocument'
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

module.exports = onBoardDocumentsSchema;
