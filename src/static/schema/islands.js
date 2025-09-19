const islandsSchema = {
  Island: {
    type: 'object',
    properties: {
      island_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the island'
      },
      island_name: {
        type: 'string',
        maxLength: 100,
        description: 'Island name (unique)'
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
        description: 'User who created the island'
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
        description: 'User who last updated the island'
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
        description: 'User who deleted the island'
      },
      is_delete: {
        type: 'boolean',
        description: 'Soft delete flag'
      }
    },
    required: ['island_id', 'island_name', 'created_at', 'is_delete']
  },
  GetIslandsRequest: {
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
        description: 'Search term for island name'
      },
      sort_by: {
        type: 'string',
        enum: ['island_name', 'created_at', 'updated_at'],
        default: 'created_at',
        description: 'Sort field'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order'
      },
      island_name: {
        type: 'string',
        maxLength: 100,
        description: 'Filter by island name'
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: '',
      sort_by: 'island_name',
      sort_order: 'asc',
      island_name: ''
    }
  },
  IslandListResponse: {
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
          $ref: '#/components/schemas/Island'
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
  IslandResponse: {
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
        $ref: '#/components/schemas/Island'
      }
    }
  }
};

module.exports = islandsSchema;
