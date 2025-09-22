const notesSchema = {
  Note: {
    type: 'object',
    properties: {
      note_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the note'
      },
      candidate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Candidate ID'
      },
      notes: {
        type: 'string',
        description: 'Note content'
      },
      create_at: {
        type: 'string',
        format: 'date-time',
        description: 'Creation timestamp'
      },
      create_by: {
        type: 'string',
        nullable: true,
        description: 'User who created the note'
      },
      update_at: {
        type: 'string',
        format: 'date-time',
        description: 'Last update timestamp'
      },
      update_by: {
        type: 'string',
        nullable: true,
        description: 'User who last updated the note'
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
        description: 'User who deleted the note'
      },
      is_delete: {
        type: 'boolean',
        description: 'Soft delete flag'
      },
      create_role: {
        type: 'string',
        nullable: true,
        description: 'Role of user who created the note'
      },
      employee_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Employee ID'
      },
      candidate_name: {
        type: 'string',
        description: 'Candidate name (when joined with candidates table)'
      },
      candidate_email: {
        type: 'string',
        description: 'Candidate email (when joined with candidates table)'
      },
      employee_name: {
        type: 'string',
        description: 'Employee name (when joined with employees table)'
      },
      employee_email: {
        type: 'string',
        description: 'Employee email (when joined with employees table)'
      }
    },
    required: ['note_id', 'candidate_id', 'notes', 'create_at', 'update_at', 'is_delete']
  },
  CreateNoteRequest: {
    type: 'object',
    properties: {
      candidate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Candidate ID'
      },
      employee_id: {
        type: 'string',
        format: 'uuid',
        description: 'Employee ID (optional)'
      },
      notes: {
        type: 'string',
        maxLength: 5000,
        description: 'Note content'
      }
    },
    required: ['candidate_id', 'notes']
  },
  GetNotesRequest: {
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
        description: 'Search term for notes content'
      },
      sort_by: {
        type: 'string',
        enum: ['create_at', 'update_at', 'notes'],
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
      employee_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by employee ID'
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: '',
      sort_by: 'create_at',
      sort_order: 'desc',
      candidate_id: '',
      employee_id: ''
    }
  },
  UpdateNoteRequest: {
    type: 'object',
    properties: {
      notes: {
        type: 'string',
        maxLength: 5000,
        description: 'Note content'
      }
    },
    required: ['notes']
  },
  DeleteNoteRequest: {
    type: 'object',
    properties: {
      note_id: {
        type: 'string',
        format: 'uuid',
        description: 'Note ID to delete'
      }
    },
    required: ['note_id']
  },
  NoteListResponse: {
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
          $ref: '#/components/schemas/Note'
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
  NoteResponse: {
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
        $ref: '#/components/schemas/Note'
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

module.exports = notesSchema;
