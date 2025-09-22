const ApplicantRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');

class ApplicantHandler {
  // POST /applicants - Create new applicant with all related data
  async createApplicant(req, res) {
    try {
      const {
        first_name,
        middle_name,
        last_name,
        mobile,
        email,
        id_number,
        position_applied_for,
        expected_salary,
        emergency_contact,
        present_address,
        city,
        date_of_birth,
        blood_type,
        tax_identification_number,
        working_available_date,
        religion,
        education_backgrounds = [],
        informal_education_qualifications = [],
        family_backgrounds = [],
        work_experiences = [],
        references = []
      } = req.body;

      const createdBy = req.user?.user_id || null;

      // Prepare main applicant data
      const applicantData = {
        first_name,
        middle_name,
        last_name,
        mobile,
        email,
        id_number,
        position_applied_for,
        expected_salary,
        emergency_contact,
        present_address,
        city,
        date_of_birth,
        blood_type,
        tax_identification_number,
        working_available_date,
        religion,
        create_by: createdBy
      };

      // Prepare related data
      const relatedData = {
        education_backgrounds,
        informal_education_qualifications,
        family_backgrounds,
        work_experiences,
        references
      };

      // Create applicant with all related data in transaction
      const applicant = await ApplicantRepository.create(applicantData, relatedData);

      res.status(201).json({
        success: true,
        message: 'Applicant created successfully',
        data: applicant
      });
    } catch (error) {
      console.error('Error creating applicant:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create applicant',
        error: error.message
      });
    }
  }

  // GET /applicants/:applicate_id - Get applicant by ID with all related data
  async getApplicant(req, res) {
    try {
      const { applicate_id } = req.params;

      const applicant = await ApplicantRepository.findByIdWithRelations(applicate_id);
      if (!applicant) {
        return res.status(404).json({
          success: false,
          message: 'Applicant not found'
        });
      }

      res.json({
        success: true,
        message: 'Applicant retrieved successfully',
        data: applicant
      });
    } catch (error) {
      console.error('Error getting applicant:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get applicant',
        error: error.message
      });
    }
  }

  // POST /applicants/get - Get applicants list with filters (POST method)
  async getApplicantsPost(req, res) {
    try {
      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: [
          'first_name', 'middle_name', 'last_name', 'email', 'mobile', 
          'id_number', 'position_applied_for', 'expected_salary', 
          'emergency_contact', 'present_address', 'city', 'date_of_birth',
          'blood_type', 'tax_identification_number', 'working_available_date',
          'religion', 'create_at', 'update_at'
        ],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: [
          'first_name', 'middle_name', 'last_name', 'email', 'mobile',
          'id_number', 'position_applied_for', 'city', 'present_address'
        ],
        allowedFilters: [
          'applicate_id', 'first_name', 'middle_name', 'last_name', 'mobile', 
          'email', 'id_number', 'position_applied_for', 'expected_salary',
          'emergency_contact', 'present_address', 'city', 'date_of_birth',
          'blood_type', 'tax_identification_number', 'working_available_date',
          'religion'
        ],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await ApplicantRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Applicants retrieved successfully');

    } catch (error) {
      console.error('Error getting applicants via POST:', error);
      return sendQueryError(res, 'Failed to get applicants', 500);
    }
  }

  // PUT /applicants/:applicate_id - Update applicant with all related data
  async updateApplicant(req, res) {
    try {
      const { applicate_id } = req.params;
      const {
        first_name,
        middle_name,
        last_name,
        mobile,
        email,
        id_number,
        position_applied_for,
        expected_salary,
        emergency_contact,
        present_address,
        city,
        date_of_birth,
        blood_type,
        tax_identification_number,
        working_available_date,
        religion,
        education_backgrounds,
        informal_education_qualifications,
        family_backgrounds,
        work_experiences,
        references
      } = req.body;

      const updatedBy = req.user?.user_id || null;

      // Check if applicant exists
      const existingApplicant = await ApplicantRepository.findById(applicate_id);
      if (!existingApplicant) {
        return res.status(404).json({
          success: false,
          message: 'Applicant not found'
        });
      }

      // Prepare update data (only include fields that are provided)
      const updateData = {
        update_by: updatedBy
      };

      if (first_name !== undefined) updateData.first_name = first_name;
      if (middle_name !== undefined) updateData.middle_name = middle_name;
      if (last_name !== undefined) updateData.last_name = last_name;
      if (mobile !== undefined) updateData.mobile = mobile;
      if (email !== undefined) updateData.email = email;
      if (id_number !== undefined) updateData.id_number = id_number;
      if (position_applied_for !== undefined) updateData.position_applied_for = position_applied_for;
      if (expected_salary !== undefined) updateData.expected_salary = expected_salary;
      if (emergency_contact !== undefined) updateData.emergency_contact = emergency_contact;
      if (present_address !== undefined) updateData.present_address = present_address;
      if (city !== undefined) updateData.city = city;
      if (date_of_birth !== undefined) updateData.date_of_birth = date_of_birth;
      if (blood_type !== undefined) updateData.blood_type = blood_type;
      if (tax_identification_number !== undefined) updateData.tax_identification_number = tax_identification_number;
      if (working_available_date !== undefined) updateData.working_available_date = working_available_date;
      if (religion !== undefined) updateData.religion = religion;

      // Prepare related data (only include if provided)
      const relatedData = {};
      if (education_backgrounds !== undefined) relatedData.education_backgrounds = education_backgrounds;
      if (informal_education_qualifications !== undefined) relatedData.informal_education_qualifications = informal_education_qualifications;
      if (family_backgrounds !== undefined) relatedData.family_backgrounds = family_backgrounds;
      if (work_experiences !== undefined) relatedData.work_experiences = work_experiences;
      if (references !== undefined) relatedData.references = references;

      // Update applicant with related data in transaction
      const applicant = await ApplicantRepository.update(applicate_id, updateData, relatedData);

      res.json({
        success: true,
        message: 'Applicant updated successfully',
        data: applicant
      });
    } catch (error) {
      console.error('Error updating applicant:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update applicant',
        error: error.message
      });
    }
  }

  // DELETE /applicants/:applicate_id - Soft delete applicant and all related data
  async deleteApplicant(req, res) {
    try {
      const { applicate_id } = req.params;
      const deletedBy = req.user?.user_id || null;

      // Check if applicant exists
      const existingApplicant = await ApplicantRepository.findById(applicate_id);
      if (!existingApplicant) {
        return res.status(404).json({
          success: false,
          message: 'Applicant not found'
        });
      }

      // Soft delete applicant and all related data in transaction
      await ApplicantRepository.softDelete(applicate_id, deletedBy);

      res.json({
        success: true,
        message: 'Applicant deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting applicant:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete applicant',
        error: error.message
      });
    }
  }

  // Additional method for GET /applicants (if needed for backward compatibility)
  async listApplicants(req, res) {
    try {
      // Parse query parameters dengan konfigurasi standar
      const queryParams = parseStandardQuery(req, {
        allowedColumns: [
          'first_name', 'middle_name', 'last_name', 'email', 'mobile', 
          'id_number', 'position_applied_for', 'expected_salary', 
          'emergency_contact', 'present_address', 'city', 'date_of_birth',
          'blood_type', 'tax_identification_number', 'working_available_date',
          'religion', 'create_at', 'update_at'
        ],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: [
          'first_name', 'middle_name', 'last_name', 'email', 'mobile',
          'id_number', 'position_applied_for', 'city', 'present_address'
        ],
        allowedFilters: [
          'applicate_id', 'first_name', 'middle_name', 'last_name', 'mobile', 
          'email', 'id_number', 'position_applied_for', 'expected_salary',
          'emergency_contact', 'present_address', 'city', 'date_of_birth',
          'blood_type', 'tax_identification_number', 'working_available_date',
          'religion'
        ]
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await ApplicantRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Applicants retrieved successfully');

    } catch (error) {
      console.error('Error listing applicants:', error);
      return sendQueryError(res, 'Failed to list applicants', 500);
    }
  }

  // PUBLIC ENDPOINT - POST /public/applicants - Create new applicant (no authentication required)
  async createApplicantPublic(req, res) {
    try {
      const {
        first_name,
        middle_name,
        last_name,
        mobile,
        email,
        id_number,
        position_applied_for,
        expected_salary,
        emergency_contact,
        present_address,
        city,
        date_of_birth,
        blood_type,
        tax_identification_number,
        working_available_date,
        religion,
        education_backgrounds = [],
        informal_education_qualifications = [],
        family_backgrounds = [],
        work_experiences = [],
        references = []
      } = req.body;

      // For public endpoint, we don't have user context, so create_by will be null
      const createdBy = null;

      // Prepare main applicant data
      const applicantData = {
        first_name,
        middle_name,
        last_name,
        mobile,
        email,
        id_number,
        position_applied_for,
        expected_salary,
        emergency_contact,
        present_address,
        city,
        date_of_birth,
        blood_type,
        tax_identification_number,
        working_available_date,
        religion,
        create_by: createdBy
      };

      // Prepare related data
      const relatedData = {
        education_backgrounds,
        informal_education_qualifications,
        family_backgrounds,
        work_experiences,
        references
      };

      // Create applicant with all related data in transaction
      const applicant = await ApplicantRepository.create(applicantData, relatedData);

      res.status(201).json({
        success: true,
        message: 'Applicant created successfully',
        data: applicant
      });
    } catch (error) {
      console.error('Error creating applicant (public):', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create applicant',
        error: error.message
      });
    }
  }
}

module.exports = new ApplicantHandler();
