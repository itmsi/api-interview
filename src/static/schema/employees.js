const employeesSchema = {
  Employee: {
    type: 'object',
    properties: {
      employee_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the employee'
      },
      employee_name: {
        type: 'string',
        maxLength: 100,
        description: 'Employee name'
      },
      employee_email: {
        type: 'string',
        format: 'email',
        maxLength: 100,
        description: 'Employee email'
      },
      title_id: {
        type: 'string',
        format: 'uuid',
        description: 'Title ID for this employee'
      },
      gender_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Gender ID for this employee'
      },
      department_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Department ID for this employee'
      },
      island_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'Island ID for this employee'
      },
      employee_mobile: {
        type: 'string',
        maxLength: 50,
        nullable: true,
        description: 'Employee mobile number'
      },
      employee_office_number: {
        type: 'string',
        maxLength: 50,
        nullable: true,
        description: 'Employee office number'
      },
      employee_address: {
        type: 'string',
        nullable: true,
        description: 'Employee address'
      },
      employee_exmail_account: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'Employee external mail account'
      },
      employee_channel: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'Employee channel'
      },
      employee_activation_status: {
        type: 'string',
        maxLength: 50,
        nullable: true,
        description: 'Employee activation status'
      },
      employee_disabled: {
        type: 'boolean',
        description: 'Employee disabled flag'
      },
      employee_wechat_workplace: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'Employee WeChat workplace'
      },
      employee_phone: {
        type: 'string',
        maxLength: 50,
        nullable: true,
        description: 'Employee phone number'
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
        description: 'User who created the employee'
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
        description: 'User who last updated the employee'
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
        description: 'User who deleted the employee'
      },
      is_delete: {
        type: 'boolean',
        description: 'Soft delete flag'
      },
      title_name: {
        type: 'string',
        description: 'Title name (when joined with titles table)'
      },
      department_name: {
        type: 'string',
        description: 'Department name (when joined with departments table)'
      },
      company_name: {
        type: 'string',
        description: 'Company name (when joined with companies table)'
      },
      gender_name: {
        type: 'string',
        description: 'Gender name (when joined with genders table)'
      },
      island_name: {
        type: 'string',
        description: 'Island name (when joined with islands table)'
      }
    },
    required: ['employee_id', 'employee_name', 'employee_email', 'title_id', 'created_at', 'is_delete', 'employee_disabled']
  },
  GetEmployeesRequest: {
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
        description: 'Search term for employee name, email, mobile, or address'
      },
      sort_by: {
        type: 'string',
        enum: ['employee_name', 'employee_email', 'employee_mobile', 'employee_activation_status', 'created_at', 'updated_at'],
        default: 'created_at',
        description: 'Sort field'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order'
      },
      employee_name: {
        type: 'string',
        maxLength: 100,
        description: 'Filter by employee name'
      },
      employee_email: {
        type: 'string',
        format: 'email',
        maxLength: 100,
        description: 'Filter by employee email'
      },
      title_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by title ID'
      },
      department_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by department ID'
      },
      gender_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by gender ID'
      },
      island_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by island ID'
      },
      employee_activation_status: {
        type: 'string',
        maxLength: 50,
        description: 'Filter by activation status'
      },
      employee_disabled: {
        type: 'boolean',
        description: 'Filter by disabled status'
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: '',
      sort_by: 'employee_name',
      sort_order: 'asc',
      employee_name: '',
      employee_email: '',
      title_id: '',
      department_id: '',
      gender_id: '',
      island_id: '',
      employee_activation_status: '',
      employee_disabled: false
    }
  },
  EmployeeListResponse: {
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
          $ref: '#/components/schemas/Employee'
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
  EmployeeResponse: {
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
        $ref: '#/components/schemas/Employee'
      }
    }
  }
};

module.exports = employeesSchema;
