const interviewSchema = {
  Interview: {
    type: 'object',
    properties: {
      interview_id: {
        type: 'string',
        format: 'uuid',
        description: 'ID unik untuk interview'
      },
      schedule_interview_id: {
        type: 'string',
        format: 'uuid',
        description: 'ID schedule interview'
      },
      company_value: {
        type: 'string',
        description: 'Nilai perusahaan (company value)'
      },
      comment: {
        type: 'string',
        nullable: true,
        description: 'Komentar interview'
      },
      employee_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'ID employee interviewer'
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
      // Related data
      schedule_interview_date: {
        type: 'string',
        format: 'date',
        description: 'Tanggal interview dari schedule'
      },
      schedule_interview_time: {
        type: 'string',
        format: 'time',
        description: 'Waktu interview dari schedule'
      },
      assign_role: {
        type: 'string',
        description: 'Role yang ditugaskan dari schedule'
      },
      employee_name: {
        type: 'string',
        nullable: true,
        description: 'Nama employee interviewer'
      },
      employee_email: {
        type: 'string',
        format: 'email',
        nullable: true,
        description: 'Email employee interviewer'
      },
      candidate_name: {
        type: 'string',
        nullable: true,
        description: 'Nama kandidat'
      },
      candidate_email: {
        type: 'string',
        format: 'email',
        nullable: true,
        description: 'Email kandidat'
      },
      candidate_phone: {
        type: 'string',
        nullable: true,
        description: 'Telepon kandidat'
      },
      details: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/InterviewDetail'
        },
        description: 'Detail interview (pertanyaan, jawaban, score)'
      }
    },
    required: ['interview_id', 'schedule_interview_id', 'company_value', 'create_at', 'update_at', 'is_delete']
  },
  
  InterviewDetail: {
    type: 'object',
    properties: {
      detail_interview_id: {
        type: 'string',
        format: 'uuid',
        description: 'ID unik untuk detail interview'
      },
      interview_id: {
        type: 'string',
        format: 'uuid',
        description: 'ID interview'
      },
      aspect: {
        type: 'string',
        nullable: true,
        description: 'Aspek yang dinilai (Leadership, Technical, dll)'
      },
      question: {
        type: 'string',
        nullable: true,
        description: 'Pertanyaan interview'
      },
      answer: {
        type: 'string',
        nullable: true,
        description: 'Jawaban kandidat'
      },
      score: {
        type: 'integer',
        minimum: 0,
        maximum: 100,
        description: 'Score penilaian (0-100)'
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
    required: ['detail_interview_id', 'interview_id', 'score', 'create_at', 'update_at', 'is_delete']
  },
  
  InterviewCreate: {
    type: 'object',
    required: ['schedule_interview_id', 'company_value'],
    properties: {
      schedule_interview_id: {
        type: 'string',
        format: 'uuid',
        description: 'ID schedule interview'
      },
      company_value: {
        type: 'string',
        description: 'Nilai perusahaan (Integrity, Excellence, dll)'
      },
      comment: {
        type: 'string',
        nullable: true,
        description: 'Komentar interview'
      },
      employee_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'ID employee interviewer'
      },
      aspect: {
        type: 'string',
        nullable: true,
        description: 'Aspek yang dinilai (Leadership, Technical, dll)'
      },
      question: {
        type: 'string',
        nullable: true,
        description: 'Pertanyaan interview'
      },
      answer: {
        type: 'string',
        nullable: true,
        description: 'Jawaban kandidat'
      },
      score: {
        type: 'integer',
        minimum: 0,
        maximum: 100,
        default: 0,
        description: 'Score penilaian (0-100)'
      }
    },
    example: {
      schedule_interview_id: '123e4567-e89b-12d3-a456-426614174000',
      company_value: 'Integrity',
      aspect: 'Leadership',
      question: 'Bagaimana Anda menangani konflik dalam tim?',
      answer: 'Saya selalu mencoba mendengarkan semua pihak dan mencari solusi yang adil.',
      score: 85,
      comment: 'Kandidat menunjukkan kemampuan leadership yang baik.',
      employee_id: '123e4567-e89b-12d3-a456-426614174001'
    }
  },
  
  InterviewUpdate: {
    type: 'object',
    properties: {
      schedule_interview_id: {
        type: 'string',
        format: 'uuid',
        description: 'ID schedule interview'
      },
      company_value: {
        type: 'string',
        description: 'Nilai perusahaan (Integrity, Excellence, dll)'
      },
      comment: {
        type: 'string',
        nullable: true,
        description: 'Komentar interview'
      },
      employee_id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
        description: 'ID employee interviewer'
      },
      aspect: {
        type: 'string',
        nullable: true,
        description: 'Aspek yang dinilai (Leadership, Technical, dll)'
      },
      question: {
        type: 'string',
        nullable: true,
        description: 'Pertanyaan interview'
      },
      answer: {
        type: 'string',
        nullable: true,
        description: 'Jawaban kandidat'
      },
      score: {
        type: 'integer',
        minimum: 0,
        maximum: 100,
        description: 'Score penilaian (0-100)'
      }
    },
    example: {
      schedule_interview_id: '123e4567-e89b-12d3-a456-426614174000',
      company_value: 'Integrity',
      aspect: 'Leadership',
      question: 'Bagaimana Anda menangani konflik dalam tim?',
      answer: 'Saya selalu mencoba mendengarkan semua pihak dan mencari solusi yang adil.',
      score: 85,
      comment: 'Kandidat menunjukkan kemampuan leadership yang baik.',
      employee_id: '123e4567-e89b-12d3-a456-426614174001'
    }
  },
  
  GetInterviewsRequest: {
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
        enum: ['company_value', 'create_at', 'update_at', 'schedule_interview_date'],
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
      company_value: {
        type: 'string',
        description: 'Filter berdasarkan company value'
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: '',
      sort_by: 'create_at',
      sort_order: 'desc',
      schedule_interview_id: '',
      employee_id: '',
      company_value: ''
    }
  },
  
  InterviewListResponse: {
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
          $ref: '#/components/schemas/Interview'
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
  
  InterviewResponse: {
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
        $ref: '#/components/schemas/Interview'
      }
    }
  },
  
  InterviewErrorResponse: {
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

module.exports = interviewSchema;
