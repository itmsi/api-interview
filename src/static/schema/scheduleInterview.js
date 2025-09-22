const scheduleInterviewSchema = {
  ScheduleInterview: {
    type: 'object',
    properties: {
      schedule_interview_id: {
        type: 'string',
        format: 'uuid',
        description: 'ID unik untuk schedule interview'
      },
      candidate_id: {
        type: 'string',
        format: 'uuid',
        description: 'ID kandidat'
      },
      candidate_name: {
        type: 'string',
        description: 'Nama kandidat'
      },
      candidate_email: {
        type: 'string',
        format: 'email',
        description: 'Email kandidat'
      },
      candidate_phone: {
        type: 'string',
        description: 'Telepon kandidat'
      },
      assign_role: {
        type: 'string',
        description: 'Role yang ditugaskan (HR,TM,PIC,HRD)'
      },
      schedule_interview_date: {
        type: 'string',
        format: 'date',
        description: 'Tanggal interview'
      },
      schedule_interview_time: {
        type: 'string',
        format: 'time',
        description: 'Waktu interview'
      },
      schedule_interview_duration: {
        type: 'string',
        description: 'Durasi interview'
      },
      create_at: {
        type: 'string',
        format: 'date-time',
        description: 'Waktu dibuat'
      },
      create_by: {
        type: 'string',
        nullable: true,
        description: 'User yang membuat'
      },
      update_at: {
        type: 'string',
        format: 'date-time',
        description: 'Waktu diupdate'
      },
      update_by: {
        type: 'string',
        nullable: true,
        description: 'User yang mengupdate'
      },
      delete_at: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'Waktu dihapus'
      },
      delete_by: {
        type: 'string',
        nullable: true,
        description: 'User yang menghapus'
      },
      is_delete: {
        type: 'boolean',
        description: 'Status soft delete'
      },
      details: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/ScheduleInterviewDetail'
        },
        description: 'Detail interview dengan employee'
      }
    },
    required: ['schedule_interview_id', 'candidate_id', 'assign_role', 'schedule_interview_date', 'schedule_interview_time', 'schedule_interview_duration', 'create_at', 'update_at', 'is_delete']
  },
  
  ScheduleInterviewDetail: {
    type: 'object',
    properties: {
      schedule_interview_details_id: {
        type: 'string',
        format: 'uuid',
        description: 'ID unik untuk detail schedule interview'
      },
      schedule_interview_id: {
        type: 'string',
        format: 'uuid',
        description: 'ID schedule interview'
      },
      employee_id: {
        type: 'string',
        format: 'uuid',
        description: 'ID employee'
      },
      employee_name: {
        type: 'string',
        description: 'Nama employee'
      },
      employee_email: {
        type: 'string',
        format: 'email',
        description: 'Email employee'
      },
      create_at: {
        type: 'string',
        format: 'date-time',
        description: 'Waktu dibuat'
      },
      create_by: {
        type: 'string',
        nullable: true,
        description: 'User yang membuat'
      },
      update_at: {
        type: 'string',
        format: 'date-time',
        description: 'Waktu diupdate'
      },
      update_by: {
        type: 'string',
        nullable: true,
        description: 'User yang mengupdate'
      },
      delete_at: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'Waktu dihapus'
      },
      delete_by: {
        type: 'string',
        nullable: true,
        description: 'User yang menghapus'
      },
      is_delete: {
        type: 'boolean',
        description: 'Status soft delete'
      }
    },
    required: ['schedule_interview_details_id', 'schedule_interview_id', 'employee_id', 'create_at', 'update_at', 'is_delete']
  },
  
  ScheduleInterviewCreate: {
    type: 'object',
    required: ['candidate_id'],
    properties: {
      candidate_id: {
        type: 'string',
        format: 'uuid',
        description: 'ID kandidat'
      },
      assign_role: {
        type: 'string',
        description: 'Role yang ditugaskan (HR,TM,PIC,HRD)',
        nullable: true
      },
      employee_id: {
        type: 'array',
        items: {
          type: 'string',
          format: 'uuid'
        },
        description: 'Array ID employee',
        nullable: true
      },
      schedule_interview_date: {
        type: 'string',
        format: 'date',
        description: 'Tanggal interview',
        nullable: true
      },
      schedule_interview_time: {
        type: 'string',
        format: 'time',
        description: 'Waktu interview (HH:MM:SS)',
        nullable: true
      },
      schedule_interview_duration: {
        type: 'string',
        description: 'Durasi interview',
        nullable: true
      }
    },
    example: {
      candidate_id: '123e4567-e89b-12d3-a456-426614174000',
      assign_role: 'HR,TM,PIC',
      employee_id: ['123e4567-e89b-12d3-a456-426614174001', '123e4567-e89b-12d3-a456-426614174002'],
      schedule_interview_date: '2023-12-01',
      schedule_interview_time: '09:00:00',
      schedule_interview_duration: '60 menit'
    }
  },
  
  ScheduleInterviewUpdate: {
    type: 'object',
    properties: {
      assign_role: {
        type: 'string',
        description: 'Role yang ditugaskan (HR,TM,PIC,HRD)',
        nullable: true
      },
      employee_id: {
        type: 'array',
        items: {
          type: 'string',
          format: 'uuid'
        },
        description: 'Array ID employee',
        nullable: true
      },
      schedule_interview_date: {
        type: 'string',
        format: 'date',
        description: 'Tanggal interview',
        nullable: true
      },
      schedule_interview_time: {
        type: 'string',
        format: 'time',
        description: 'Waktu interview (HH:MM:SS)',
        nullable: true
      },
      schedule_interview_duration: {
        type: 'string',
        description: 'Durasi interview',
        nullable: true
      }
    },
    example: {
      assign_role: 'HR,TM',
      employee_id: ['123e4567-e89b-12d3-a456-426614174001'],
      schedule_interview_date: '2023-12-02',
      schedule_interview_time: '10:00:00',
      schedule_interview_duration: '45 menit'
    }
  },
  
  GetScheduleInterviewsRequest: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
        description: 'Nomor halaman'
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 10,
        description: 'Jumlah item per halaman'
      },
      search: {
        type: 'string',
        maxLength: 100,
        description: 'Kata kunci pencarian'
      },
      sort_by: {
        type: 'string',
        enum: ['schedule_interview_date', 'schedule_interview_time', 'assign_role', 'create_at', 'update_at'],
        default: 'create_at',
        description: 'Field untuk sorting'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Urutan sorting'
      },
      schedule_interview_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter berdasarkan schedule interview ID'
      },
      employee_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter berdasarkan employee ID'
      },
      schedule_interview_date: {
        type: 'string',
        format: 'date',
        description: 'Filter berdasarkan tanggal interview'
      },
      schedule_interview_time: {
        type: 'string',
        format: 'time',
        description: 'Filter berdasarkan waktu interview'
      },
      schedule_interview_duration: {
        type: 'string',
        description: 'Filter berdasarkan durasi interview'
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: 'John Doe',
      sort_by: 'create_at',
      sort_order: 'desc',
      schedule_interview_date: '2023-12-01'
    }
  },
  
  ScheduleInterviewListResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        description: 'Status keberhasilan request'
      },
      message: {
        type: 'string',
        description: 'Pesan response'
      },
      data: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/ScheduleInterview'
        }
      },
      pagination: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            description: 'Nomor halaman saat ini'
          },
          limit: {
            type: 'integer',
            description: 'Jumlah item per halaman'
          },
          total: {
            type: 'integer',
            description: 'Total jumlah item'
          },
          totalPages: {
            type: 'integer',
            description: 'Total jumlah halaman'
          },
          hasNextPage: {
            type: 'boolean',
            description: 'Apakah ada halaman selanjutnya'
          },
          hasPrevPage: {
            type: 'boolean',
            description: 'Apakah ada halaman sebelumnya'
          },
          nextPage: {
            type: 'integer',
            nullable: true,
            description: 'Nomor halaman selanjutnya'
          },
          prevPage: {
            type: 'integer',
            nullable: true,
            description: 'Nomor halaman sebelumnya'
          }
        }
      }
    }
  },
  
  ScheduleInterviewResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        description: 'Status keberhasilan request'
      },
      message: {
        type: 'string',
        description: 'Pesan response'
      },
      data: {
        $ref: '#/components/schemas/ScheduleInterview'
      }
    }
  },
  
  ScheduleInterviewErrorResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        description: 'Status keberhasilan request'
      },
      message: {
        type: 'string',
        description: 'Pesan error'
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            field: {
              type: 'string',
              description: 'Field yang error'
            },
            message: {
              type: 'string',
              description: 'Pesan error'
            }
          }
        }
      }
    }
  }
};

module.exports = scheduleInterviewSchema;
