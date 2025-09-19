const departmentsSchema = {
  Department: {
    type: 'object',
    properties: {
      department_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the department'
      },
      department_name: {
        type: 'string',
        maxLength: 100,
        description: 'Department name'
      },
      department_parent_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Parent department ID (self-reference)'
      },
      company_id: {
        type: 'string',
        format: 'uuid',
        description: 'Company ID that owns this department'
      },
      department_segmentasi: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'Department segmentation'
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
        description: 'User who created the department'
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
        description: 'User who last updated the department'
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
        description: 'User who deleted the department'
      },
      is_delete: {
        type: 'boolean',
        description: 'Soft delete flag'
      },
      company_name: {
        type: 'string',
        description: 'Company name (when joined with companies table)'
      },
      company_email: {
        type: 'string',
        description: 'Company email (when using with company endpoint)'
      },
      company_address: {
        type: 'string',
        description: 'Company address (when using with company endpoint)'
      },
      children_count: {
        type: 'integer',
        description: 'Number of child departments (when using with children endpoint)'
      }
    },
    required: ['department_id', 'department_name', 'company_id', 'created_at', 'is_delete']
  },
  GetDepartmentsRequest: {
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
        description: 'Search term for department name or segmentation'
      },
      sort_by: {
        type: 'string',
        enum: ['department_name', 'department_segmentasi', 'created_at', 'updated_at'],
        default: 'created_at',
        description: 'Sort field'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order'
      },
      department_name: {
        type: 'string',
        maxLength: 100,
        description: 'Filter by department name'
      },
      department_segmentasi: {
        type: 'string',
        maxLength: 100,
        description: 'Filter by department segmentation'
      },
      company_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by company ID'
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: '',
      sort_by: 'department_name',
      sort_order: 'asc',
      department_name: '',
      department_segmentasi: '',
      company_id: ''
    }
  },
  DepartmentListResponse: {
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
          $ref: '#/components/schemas/Department'
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
  DepartmentResponse: {
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
        $ref: '#/components/schemas/Department'
      }
    }
  }
};

module.exports = departmentsSchema;
