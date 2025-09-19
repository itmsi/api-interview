const titlesSchema = {
  Title: {
    type: 'object',
    properties: {
      title_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the title'
      },
      title_name: {
        type: 'string',
        maxLength: 100,
        description: 'Title name'
      },
      department_id: {
        type: 'string',
        format: 'uuid',
        description: 'Department ID that owns this title'
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
        description: 'User who created the title'
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
        description: 'User who last updated the title'
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
        description: 'User who deleted the title'
      },
      is_delete: {
        type: 'boolean',
        description: 'Soft delete flag'
      },
      department_name: {
        type: 'string',
        description: 'Department name (when joined with departments table)'
      },
      department_segmentasi: {
        type: 'string',
        description: 'Department segmentation (when using with department endpoint)'
      },
      company_name: {
        type: 'string',
        description: 'Company name (when joined with companies table)'
      }
    },
    required: ['title_id', 'title_name', 'department_id', 'created_at', 'is_delete']
  },
  GetTitlesRequest: {
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
        description: 'Search term for title name'
      },
      sort_by: {
        type: 'string',
        enum: ['title_name', 'created_at', 'updated_at'],
        default: 'created_at',
        description: 'Sort field'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order'
      },
      title_name: {
        type: 'string',
        maxLength: 100,
        description: 'Filter by title name'
      },
      department_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by department ID'
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: '',
      sort_by: 'title_name',
      sort_order: 'asc',
      title_name: '',
      department_id: ''
    }
  },
  TitleListResponse: {
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
          $ref: '#/components/schemas/Title'
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
  TitleResponse: {
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
        $ref: '#/components/schemas/Title'
      }
    }
  }
};

module.exports = titlesSchema;
