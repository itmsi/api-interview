const companiesSchema = {
  Company: {
    type: 'object',
    properties: {
      company_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the company'
      },
      company_name: {
        type: 'string',
        maxLength: 100,
        description: 'Company name'
      },
      company_parent_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Parent company ID (self-reference)'
      },
      company_address: {
        type: 'string',
        nullable: true,
        description: 'Company address'
      },
      company_email: {
        type: 'string',
        format: 'email',
        maxLength: 100,
        nullable: true,
        description: 'Company email'
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
        description: 'User who created the company'
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
        description: 'User who last updated the company'
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
        description: 'User who deleted the company'
      },
      is_delete: {
        type: 'boolean',
        description: 'Soft delete flag'
      },
      children_count: {
        type: 'integer',
        description: 'Number of child companies (when using with children endpoint)'
      }
    },
    required: ['company_id', 'company_name', 'created_at', 'is_delete']
  },
  GetCompaniesRequest: {
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
        description: 'Search term for company name, email, or address'
      },
      sort_by: {
        type: 'string',
        enum: ['company_name', 'company_email', 'created_at', 'updated_at'],
        default: 'created_at',
        description: 'Sort field'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order'
      },
      company_name: {
        type: 'string',
        maxLength: 100,
        description: 'Filter by company name'
      },
      company_email: {
        type: 'string',
        format: 'email',
        maxLength: 100,
        description: 'Filter by company email'
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: '',
      sort_by: 'company_name',
      sort_order: 'asc',
      company_name: '',
      company_email: ''
    }
  },
  CompanyListResponse: {
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
          $ref: '#/components/schemas/Company'
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
  CompanyResponse: {
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
        $ref: '#/components/schemas/Company'
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

module.exports = companiesSchema;
