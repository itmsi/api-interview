const gendersSchema = {
  Gender: {
    type: 'object',
    properties: {
      gender_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the gender'
      },
      gender_name: {
        type: 'string',
        maxLength: 50,
        description: 'Gender name (unique)'
      },
      created_at: {
        type: 'string',
        format: 'date-time',
        description: 'Creation timestamp'
      },
      created_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who created the gender'
      },
      updated_at: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'Last update timestamp'
      },
      updated_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who last updated the gender'
      },
      deleted_at: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'Deletion timestamp'
      },
      deleted_by: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'User who deleted the gender'
      },
      is_delete: {
        type: 'boolean',
        description: 'Soft delete flag'
      }
    },
    required: ['gender_id', 'gender_name', 'created_at', 'is_delete']
  },
  GetGendersRequest: {
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
        description: 'Search term for gender name'
      },
      sort_by: {
        type: 'string',
        enum: ['gender_name', 'created_at', 'updated_at'],
        default: 'created_at',
        description: 'Sort field'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order'
      },
      gender_name: {
        type: 'string',
        maxLength: 50,
        description: 'Filter by gender name'
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: '',
      sort_by: 'gender_name',
      sort_order: 'asc',
      gender_name: ''
    }
  },
  GenderListResponse: {
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
          $ref: '#/components/schemas/Gender'
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
  GenderResponse: {
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
        $ref: '#/components/schemas/Gender'
      }
    }
  }
};

module.exports = gendersSchema;
