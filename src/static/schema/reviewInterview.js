const reviewInterviewSchema = {
  ReviewInterviewCandidate: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'Candidate ID'
      },
      name: {
        type: 'string',
        description: 'Nama kandidat'
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'Email kandidat'
      },
      position: {
        type: 'string',
        description: 'Posisi/jabatan kandidat'
      },
      company: {
        type: 'string',
        description: 'Nama perusahaan'
      },
      image: {
        type: 'string',
        nullable: true,
        description: 'URL foto kandidat'
      },
      date_applied: {
        type: 'string',
        format: 'date-time',
        description: 'Tanggal aplikasi kandidat'
      }
    },
    required: ['id', 'name', 'email', 'position', 'company', 'date_applied']
  },

  GetReviewInterviewRequest: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        minimum: 1,
        default: 1,
        description: 'Nomor halaman untuk pagination'
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        default: 10,
        description: 'Jumlah data per halaman'
      },
      search: {
        type: 'string',
        maxLength: 255,
        description: 'Kata kunci pencarian'
      },
      sort_by: {
        type: 'string',
        enum: ['candidate_name', 'candidate_email', 'company_name', 'title_name', 'create_at'],
        default: 'create_at',
        description: 'Field untuk sorting'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Urutan sorting'
      },
      interview_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter berdasarkan interview ID'
      },
      candidate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter berdasarkan candidate ID'
      },
      company_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter berdasarkan company ID'
      },
      title_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter berdasarkan title ID'
      },
      departement_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter berdasarkan department ID'
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: 'kata kunci pencarian',
      sort_by: 'create_at',
      sort_order: 'desc',
      interview_id: 'uuid-interview'
    }
  },

  ReviewInterviewData: {
    type: 'object',
    properties: {
      recent_candidates: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/ReviewInterviewCandidate'
        },
        description: 'Daftar kandidat yang telah melakukan interview'
      }
    },
    required: ['recent_candidates']
  },

  ReviewInterviewResponse: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'integer',
        example: 200,
        description: 'Status code response'
      },
      message: {
        type: 'string',
        example: 'Dashboard data retrieved successfully',
        description: 'Pesan response'
      },
      data: {
        $ref: '#/components/schemas/ReviewInterviewData'
      }
    },
    required: ['statusCode', 'message', 'data']
  },

  ReviewInterviewErrorResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: false,
        description: 'Status keberhasilan request'
      },
      message: {
        type: 'string',
        example: 'Validation failed',
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
        },
        description: 'Detail error validasi'
      }
    }
  }
};

module.exports = reviewInterviewSchema;
