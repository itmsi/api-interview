const applicantSchema = {
  ApplicantInformation: {
    type: 'object',
    properties: {
      applicate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the applicant'
      },
      first_name: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'First name of the applicant'
      },
      middle_name: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Middle name of the applicant'
      },
      last_name: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Last name of the applicant'
      },
      mobile: {
        type: 'string',
        maxLength: 50,
        nullable: true,
        description: 'Mobile phone number'
      },
      email: {
        type: 'string',
        format: 'email',
        maxLength: 255,
        nullable: true,
        description: 'Email address'
      },
      id_number: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'National ID number'
      },
      position_applied_for: {
        type: 'string',
        maxLength: 255,
        nullable: true,
        description: 'Position applied for'
      },
      expected_salary: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'Expected salary'
      },
      emergency_contact: {
        type: 'string',
        maxLength: 50,
        nullable: true,
        description: 'Emergency contact number'
      },
      present_address: {
        type: 'string',
        maxLength: 1000,
        nullable: true,
        description: 'Present address'
      },
      city: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'City'
      },
      date_of_birth: {
        type: 'string',
        format: 'date',
        nullable: true,
        description: 'Date of birth'
      },
      blood_type: {
        type: 'string',
        maxLength: 10,
        nullable: true,
        description: 'Blood type'
      },
      tax_identification_number: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'Tax identification number'
      },
      working_available_date: {
        type: 'string',
        format: 'date',
        nullable: true,
        description: 'Working available date'
      },
      religion: {
        type: 'string',
        maxLength: 100,
        nullable: true,
        description: 'Religion'
      },
      create_at: {
        type: 'string',
        format: 'date-time',
        description: 'Creation timestamp'
      },
      create_by: {
        type: 'string',
        nullable: true,
        description: 'User who created the applicant'
      },
      update_at: {
        type: 'string',
        format: 'date-time',
        description: 'Last update timestamp'
      },
      update_by: {
        type: 'string',
        nullable: true,
        description: 'User who last updated the applicant'
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
        description: 'User who deleted the applicant'
      },
      is_delete: {
        type: 'boolean',
        description: 'Soft delete flag'
      }
    },
    required: ['applicate_id', 'create_at', 'update_at', 'is_delete']
  },
  EducationBackground: {
    type: 'object',
    properties: {
      education_background_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for education background'
      },
      applicate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Applicant ID'
      },
      type_of_school: {
        type: 'string',
        nullable: true,
        description: 'Type of school'
      },
      name_of_school: {
        type: 'string',
        nullable: true,
        description: 'Name of school'
      },
      location_of_school: {
        type: 'string',
        nullable: true,
        description: 'Location of school'
      },
      grade_of_school: {
        type: 'string',
        nullable: true,
        description: 'Grade/GPA of school'
      },
      major_of_school: {
        type: 'string',
        nullable: true,
        description: 'Major of school'
      }
    }
  },
  InformalEducationQualification: {
    type: 'object',
    properties: {
      informal_education_qualification_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for informal education qualification'
      },
      applicate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Applicant ID'
      },
      type_of_training: {
        type: 'string',
        nullable: true,
        description: 'Type of training'
      },
      institute_name: {
        type: 'string',
        nullable: true,
        description: 'Institute name'
      },
      location_of_institute: {
        type: 'string',
        nullable: true,
        description: 'Location of institute'
      },
      certificate_of_training: {
        type: 'string',
        nullable: true,
        description: 'Certificate of training'
      },
      period_of_training: {
        type: 'string',
        nullable: true,
        description: 'Period of training'
      }
    }
  },
  FamilyBackground: {
    type: 'object',
    properties: {
      family_background_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for family background'
      },
      applicate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Applicant ID'
      },
      relationship_of_family_member: {
        type: 'string',
        nullable: true,
        description: 'Relationship of family member'
      },
      name_of_family_member: {
        type: 'string',
        nullable: true,
        description: 'Name of family member'
      },
      age_of_family_member: {
        type: 'string',
        nullable: true,
        description: 'Age of family member'
      },
      employment_status_of_family_member: {
        type: 'string',
        nullable: true,
        description: 'Employment status of family member'
      },
      emergency_contact_of_family_member: {
        type: 'string',
        nullable: true,
        description: 'Emergency contact of family member'
      }
    }
  },
  WorkExperience: {
    type: 'object',
    properties: {
      work_experience_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for work experience'
      },
      applicate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Applicant ID'
      },
      company_name: {
        type: 'string',
        nullable: true,
        description: 'Company name'
      },
      start_date_of_work: {
        type: 'string',
        format: 'date',
        nullable: true,
        description: 'Start date of work'
      },
      end_date_of_work: {
        type: 'string',
        format: 'date',
        nullable: true,
        description: 'End date of work'
      },
      pay_per_month: {
        type: 'string',
        nullable: true,
        description: 'Pay per month'
      },
      name_of_supervisor: {
        type: 'string',
        nullable: true,
        description: 'Name of supervisor'
      },
      reason_for_leaving: {
        type: 'string',
        nullable: true,
        description: 'Reason for leaving'
      }
    }
  },
  Reference: {
    type: 'object',
    properties: {
      reference_id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for reference'
      },
      applicate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Applicant ID'
      },
      name_of_reference: {
        type: 'string',
        nullable: true,
        description: 'Name of reference'
      },
      position_of_reference: {
        type: 'string',
        nullable: true,
        description: 'Position of reference'
      },
      phone_number_of_reference: {
        type: 'string',
        nullable: true,
        description: 'Phone number of reference'
      }
    }
  },
  ApplicantWithRelations: {
    allOf: [
      { $ref: '#/components/schemas/ApplicantInformation' },
      {
        type: 'object',
        properties: {
          education_backgrounds: {
            type: 'array',
            items: { $ref: '#/components/schemas/EducationBackground' },
            description: 'Education background records'
          },
          informal_education_qualifications: {
            type: 'array',
            items: { $ref: '#/components/schemas/InformalEducationQualification' },
            description: 'Informal education qualification records'
          },
          family_backgrounds: {
            type: 'array',
            items: { $ref: '#/components/schemas/FamilyBackground' },
            description: 'Family background records'
          },
          work_experiences: {
            type: 'array',
            items: { $ref: '#/components/schemas/WorkExperience' },
            description: 'Work experience records'
          },
          references: {
            type: 'array',
            items: { $ref: '#/components/schemas/Reference' },
            description: 'Reference records'
          }
        }
      }
    ]
  },
  CreateApplicantRequest: {
    type: 'object',
    properties: {
      first_name: {
        type: 'string',
        maxLength: 255,
        description: 'First name of the applicant'
      },
      middle_name: {
        type: 'string',
        maxLength: 255,
        description: 'Middle name of the applicant'
      },
      last_name: {
        type: 'string',
        maxLength: 255,
        description: 'Last name of the applicant'
      },
      mobile: {
        type: 'string',
        maxLength: 50,
        description: 'Mobile phone number'
      },
      email: {
        type: 'string',
        format: 'email',
        maxLength: 255,
        description: 'Email address'
      },
      id_number: {
        type: 'string',
        maxLength: 100,
        description: 'National ID number'
      },
      position_applied_for: {
        type: 'string',
        maxLength: 255,
        description: 'Position applied for'
      },
      expected_salary: {
        type: 'string',
        maxLength: 100,
        description: 'Expected salary'
      },
      emergency_contact: {
        type: 'string',
        maxLength: 50,
        description: 'Emergency contact number'
      },
      present_address: {
        type: 'string',
        maxLength: 1000,
        description: 'Present address'
      },
      city: {
        type: 'string',
        maxLength: 100,
        description: 'City'
      },
      date_of_birth: {
        type: 'string',
        format: 'date',
        description: 'Date of birth'
      },
      blood_type: {
        type: 'string',
        maxLength: 10,
        description: 'Blood type'
      },
      tax_identification_number: {
        type: 'string',
        maxLength: 100,
        description: 'Tax identification number'
      },
      working_available_date: {
        type: 'string',
        format: 'date',
        description: 'Working available date'
      },
      religion: {
        type: 'string',
        maxLength: 100,
        description: 'Religion'
      },
      education_backgrounds: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type_of_school: { type: 'string', description: 'Type of school' },
            name_of_school: { type: 'string', description: 'Name of school' },
            location_of_school: { type: 'string', description: 'Location of school' },
            grade_of_school: { type: 'string', description: 'Grade/GPA of school' },
            major_of_school: { type: 'string', description: 'Major of school' }
          }
        },
        description: 'Education background records'
      },
      informal_education_qualifications: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type_of_training: { type: 'string', description: 'Type of training' },
            institute_name: { type: 'string', description: 'Institute name' },
            location_of_institute: { type: 'string', description: 'Location of institute' },
            certificate_of_training: { type: 'string', description: 'Certificate of training' },
            period_of_training: { type: 'string', description: 'Period of training' }
          }
        },
        description: 'Informal education qualification records'
      },
      family_backgrounds: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            relationship_of_family_member: { type: 'string', description: 'Relationship of family member' },
            name_of_family_member: { type: 'string', description: 'Name of family member' },
            age_of_family_member: { type: 'string', description: 'Age of family member' },
            employment_status_of_family_member: { type: 'string', description: 'Employment status of family member' },
            emergency_contact_of_family_member: { type: 'string', description: 'Emergency contact of family member' }
          }
        },
        description: 'Family background records'
      },
      work_experiences: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            company_name: { type: 'string', description: 'Company name' },
            start_date_of_work: { type: 'string', format: 'date', description: 'Start date of work' },
            end_date_of_work: { type: 'string', format: 'date', description: 'End date of work' },
            pay_per_month: { type: 'string', description: 'Pay per month' },
            name_of_supervisor: { type: 'string', description: 'Name of supervisor' },
            reason_for_leaving: { type: 'string', description: 'Reason for leaving' }
          }
        },
        description: 'Work experience records'
      },
      references: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name_of_reference: { type: 'string', description: 'Name of reference' },
            position_of_reference: { type: 'string', description: 'Position of reference' },
            phone_number_of_reference: { type: 'string', description: 'Phone number of reference' }
          }
        },
        description: 'Reference records'
      }
    },
    example: {
      first_name: 'John',
      middle_name: 'William',
      last_name: 'Doe',
      mobile: '081234567890',
      email: 'john.doe@example.com',
      id_number: '3201234567890001',
      position_applied_for: 'Software Engineer',
      expected_salary: '10000000',
      emergency_contact: '081987654321',
      present_address: 'Jl. Sudirman No. 123, Jakarta',
      city: 'Jakarta',
      date_of_birth: '1990-01-01',
      blood_type: 'O+',
      tax_identification_number: '123456789012345',
      working_available_date: '2024-01-01',
      religion: 'Islam',
      education_backgrounds: [
        {
          type_of_school: 'University',
          name_of_school: 'Universitas Indonesia',
          location_of_school: 'Depok, West Java',
          grade_of_school: '3.75',
          major_of_school: 'Computer Science'
        }
      ],
      informal_education_qualifications: [
        {
          type_of_training: 'Certification',
          institute_name: 'AWS',
          location_of_institute: 'Online',
          certificate_of_training: 'AWS Solutions Architect',
          period_of_training: '3 months'
        }
      ],
      family_backgrounds: [
        {
          relationship_of_family_member: 'Father',
          name_of_family_member: 'John Doe Sr.',
          age_of_family_member: '60',
          employment_status_of_family_member: 'Retired',
          emergency_contact_of_family_member: '081111111111'
        }
      ],
      work_experiences: [
        {
          company_name: 'PT. Tech Indonesia',
          start_date_of_work: '2020-01-01',
          end_date_of_work: '2023-12-31',
          pay_per_month: '8000000',
          name_of_supervisor: 'Jane Smith',
          reason_for_leaving: 'Career advancement'
        }
      ],
      references: [
        {
          name_of_reference: 'Jane Smith',
          position_of_reference: 'Senior Manager',
          phone_number_of_reference: '081222222222'
        }
      ]
    }
  },
  GetApplicantsRequest: {
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
        description: 'Search term for first name, last name, email, mobile, etc.'
      },
      sort_by: {
        type: 'string',
        enum: ['first_name', 'last_name', 'email', 'mobile', 'position_applied_for', 'create_at', 'update_at'],
        default: 'create_at',
        description: 'Sort field'
      },
      sort_order: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        description: 'Sort order'
      },
      applicate_id: {
        type: 'string',
        format: 'uuid',
        description: 'Filter by applicant ID'
      },
      first_name: {
        type: 'string',
        maxLength: 255,
        description: 'Filter by first name'
      },
      middle_name: {
        type: 'string',
        maxLength: 255,
        description: 'Filter by middle name'
      },
      last_name: {
        type: 'string',
        maxLength: 255,
        description: 'Filter by last name'
      },
      mobile: {
        type: 'string',
        maxLength: 50,
        description: 'Filter by mobile'
      },
      email: {
        type: 'string',
        format: 'email',
        maxLength: 255,
        description: 'Filter by email'
      },
      id_number: {
        type: 'string',
        maxLength: 100,
        description: 'Filter by ID number'
      },
      position_applied_for: {
        type: 'string',
        maxLength: 255,
        description: 'Filter by position applied for'
      },
      expected_salary: {
        type: 'string',
        maxLength: 100,
        description: 'Filter by expected salary'
      },
      emergency_contact: {
        type: 'string',
        maxLength: 50,
        description: 'Filter by emergency contact'
      },
      present_address: {
        type: 'string',
        maxLength: 1000,
        description: 'Filter by present address'
      },
      city: {
        type: 'string',
        maxLength: 100,
        description: 'Filter by city'
      },
      date_of_birth: {
        type: 'string',
        format: 'date',
        description: 'Filter by date of birth'
      },
      blood_type: {
        type: 'string',
        maxLength: 10,
        description: 'Filter by blood type'
      },
      tax_identification_number: {
        type: 'string',
        maxLength: 100,
        description: 'Filter by tax identification number'
      },
      working_available_date: {
        type: 'string',
        format: 'date',
        description: 'Filter by working available date'
      },
      religion: {
        type: 'string',
        maxLength: 100,
        description: 'Filter by religion'
      }
    },
    example: {
      page: 1,
      limit: 10,
      search: '',
      sort_by: 'create_at',
      sort_order: 'desc',
      first_name: '',
      email: '',
      position_applied_for: ''
    }
  },
  UpdateApplicantRequest: {
    allOf: [
      { $ref: '#/components/schemas/CreateApplicantRequest' },
      {
        type: 'object',
        properties: {
          applicate_id: {
            type: 'string',
            format: 'uuid',
            description: 'Applicant ID to update'
          }
        },
        required: ['applicate_id']
      }
    ]
  },
  ApplicantListResponse: {
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
          $ref: '#/components/schemas/ApplicantInformation'
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
  ApplicantResponse: {
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
        $ref: '#/components/schemas/ApplicantWithRelations'
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

module.exports = applicantSchema;
