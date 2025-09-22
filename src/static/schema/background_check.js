const backgroundCheckSchema = {
  BackgroundCheck: {
    type: 'object',
    properties: {
      background_check_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the background check'
      },
      candidate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Candidate ID'
      },
      background_check_note: {
        type: 'string',
        nullable: true,
        description: 'Background check notes'
      },
      create_at: {
        type: 'string',
        format: 'date-time',
        description: 'Creation timestamp'
      },
      create_by: {
        type: 'string',
        nullable: true,
        description: 'User who created the background check'
      },
      update_at: {
        type: 'string',
        format: 'date-time',
        description: 'Last update timestamp'
      },
      update_by: {
        type: 'string',
        nullable: true,
        description: 'User who last updated the background check'
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
        description: 'User who deleted the background check'
      },
      file_attachment: {
        type: 'string',
        nullable: true,
        description: 'File attachment URL'
      },
      background_check_status: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Background check status'
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
      }
    },
    required: ['background_check_id', 'candidate_id', 'create_at', 'update_at']
  },
  CreateBackgroundCheckRequest: {
    type: 'object',
    properties: {
      candidate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Candidate ID'
      },
      background_check_status: {
        type: 'string',
        maxLength: 255,
        description: 'Background check status'
      },
      background_check_note: {
        type: 'string',
        maxLength: 2000,
        description: 'Background check notes'
      },
      file_attachment: {
        type: 'string',
        format: 'binary',
        description: 'File attachment'
      }
    },
    required: ['candidate_id']
  },
  GetBackgroundChecksRequest: {
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
        description: 'Search term for background check note, status, candidate name, or email'
      },
      sort_by: {
        type: 'string',
        enum: ['background_check_status', 'create_at', 'update_at'],
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
      background_check_status: {
        type: 'string',
        maxLength: 255,
        description: 'Filter by background check status'
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: '',
      sort_by: 'create_at',
      sort_order: 'desc',
      candidate_id: '',
      background_check_status: ''
    }
  },
  UpdateBackgroundCheckRequest: {
    type: 'object',
    properties: {
      background_check_status: {
        type: 'string',
        maxLength: 255,
        description: 'Background check status'
      },
      background_check_note: {
        type: 'string',
        maxLength: 2000,
        description: 'Background check notes'
      },
      file_attachment: {
        type: 'string',
        format: 'binary',
        description: 'File attachment'
      }
    }
  },
  BackgroundCheckListResponse: {
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
          $ref: '#/components/schemas/BackgroundCheck'
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
  BackgroundCheckResponse: {
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
        $ref: '#/components/schemas/BackgroundCheck'
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

module.exports = backgroundCheckSchema;
