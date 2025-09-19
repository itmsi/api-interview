const CandidatesRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');
const { generateMinioUpload, generateMinioUploadUpdated } = require('../../utils/minio-upload');

class CandidatesHandler {
  async createCandidate(req, res) {
    try {
      const {
        candidate_name,
        candidate_email,
        candidate_phone,
        candidate_religion,
        candidate_marital_status,
        candidate_age,
        candidate_date_birth,
        candidate_nationality,
        candidate_city,
        candidate_state,
        candidate_country,
        candidate_address,
        candidate_number,
        company_id,
        departement_id,
        title_id,
        gender_id
      } = req.body;

      const createdBy = req.user?.user_id || null;

      // Handle file uploads
      let candidate_foto = null;
      let candidate_resume = null;

      // Upload candidate foto if provided
      if (req.files && req.files.candidate_foto) {
        const fotoUpload = await generateMinioUpload(
          req, 
          'candidate_foto', 
          'candidates/photos', 
          'candidate-photo',
          '',
          { 
            isWatermark: false, 
            isPrivate: false, 
            isContentType: true, 
            compressImage: true 
          }
        );
        
        if (fotoUpload.status) {
          candidate_foto = fotoUpload.pathForDatabase;
        }
      }

      // Upload candidate resume if provided
      if (req.files && req.files.candidate_resume) {
        const resumeUpload = await generateMinioUpload(
          req, 
          'candidate_resume', 
          'candidates/resumes', 
          'candidate-resume',
          '',
          { 
            isWatermark: false, 
            isPrivate: false, 
            isContentType: true 
          }
        );
        
        if (resumeUpload.status) {
          candidate_resume = resumeUpload.pathForDatabase;
        }
      }

      const candidateData = {
        candidate_name,
        candidate_email,
        candidate_phone,
        candidate_religion,
        candidate_marital_status,
        candidate_age: candidate_age ? parseInt(candidate_age) : null,
        candidate_date_birth,
        candidate_nationality,
        candidate_city,
        candidate_state,
        candidate_country,
        candidate_address,
        candidate_foto,
        candidate_resume,
        candidate_number,
        company_id: company_id || null,
        departement_id: departement_id || null,
        title_id: title_id || null,
        gender_id: gender_id || null,
        create_by: createdBy
      };

      const candidate = await CandidatesRepository.create(candidateData);

      res.status(201).json({
        success: true,
        message: 'Candidate created successfully',
        data: candidate
      });
    } catch (error) {
      console.error('Error creating candidate:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create candidate',
        error: error.message
      });
    }
  }

  async getCandidate(req, res) {
    try {
      const { id } = req.params;

      const candidate = await CandidatesRepository.findById(id);
      if (!candidate) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found'
        });
      }

      res.json({
        success: true,
        message: 'Candidate retrieved successfully',
        data: candidate
      });
    } catch (error) {
      console.error('Error getting candidate:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get candidate',
        error: error.message
      });
    }
  }

  async listCandidates(req, res) {
    try {
      // Parse query parameters dengan konfigurasi standar
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['candidate_name', 'candidate_email', 'candidate_phone', 'candidate_age', 'create_at', 'update_at'],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: ['candidate_name', 'candidate_email', 'candidate_phone', 'candidate_city', 'candidate_country'],
        allowedFilters: ['candidate_name', 'candidate_email', 'company_id', 'departement_id', 'title_id', 'gender_id', 'candidate_city', 'candidate_country']
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await CandidatesRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Candidates retrieved successfully');

    } catch (error) {
      console.error('Error listing candidates:', error);
      return sendQueryError(res, 'Failed to list candidates', 500);
    }
  }

  async updateCandidate(req, res) {
    try {
      const { id } = req.params;
      const {
        candidate_name,
        candidate_email,
        candidate_phone,
        candidate_religion,
        candidate_marital_status,
        candidate_age,
        candidate_date_birth,
        candidate_nationality,
        candidate_city,
        candidate_state,
        candidate_country,
        candidate_address,
        candidate_number,
        company_id,
        departement_id,
        title_id,
        gender_id
      } = req.body;

      const updatedBy = req.user?.user_id || null;

      const existingCandidate = await CandidatesRepository.findById(id);
      if (!existingCandidate) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found'
        });
      }

      const updateData = {
        update_by: updatedBy
      };

      // Update fields only if provided
      if (candidate_name !== undefined) updateData.candidate_name = candidate_name;
      if (candidate_email !== undefined) updateData.candidate_email = candidate_email;
      if (candidate_phone !== undefined) updateData.candidate_phone = candidate_phone;
      if (candidate_religion !== undefined) updateData.candidate_religion = candidate_religion;
      if (candidate_marital_status !== undefined) updateData.candidate_marital_status = candidate_marital_status;
      if (candidate_age !== undefined) updateData.candidate_age = candidate_age ? parseInt(candidate_age) : null;
      if (candidate_date_birth !== undefined) updateData.candidate_date_birth = candidate_date_birth;
      if (candidate_nationality !== undefined) updateData.candidate_nationality = candidate_nationality;
      if (candidate_city !== undefined) updateData.candidate_city = candidate_city;
      if (candidate_state !== undefined) updateData.candidate_state = candidate_state;
      if (candidate_country !== undefined) updateData.candidate_country = candidate_country;
      if (candidate_address !== undefined) updateData.candidate_address = candidate_address;
      if (candidate_number !== undefined) updateData.candidate_number = candidate_number;
      if (company_id !== undefined) updateData.company_id = company_id || null;
      if (departement_id !== undefined) updateData.departement_id = departement_id || null;
      if (title_id !== undefined) updateData.title_id = title_id || null;
      if (gender_id !== undefined) updateData.gender_id = gender_id || null;

      // Handle file uploads
      if (req.files && req.files.candidate_foto) {
        const fotoUpload = await generateMinioUploadUpdated(
          req,
          { num: 'candidate_foto', name: 'candidate-photo', path: 'candidates/photos' },
          { payload: existingCandidate.candidate_foto },
          '',
          { 
            isWatermark: false, 
            isPrivate: false, 
            isContentType: true, 
            compressImage: true 
          }
        );
        
        if (fotoUpload) {
          updateData.candidate_foto = fotoUpload;
        }
      }

      if (req.files && req.files.candidate_resume) {
        const resumeUpload = await generateMinioUploadUpdated(
          req,
          { num: 'candidate_resume', name: 'candidate-resume', path: 'candidates/resumes' },
          { payload: existingCandidate.candidate_resume },
          '',
          { 
            isWatermark: false, 
            isPrivate: false, 
            isContentType: true 
          }
        );
        
        if (resumeUpload) {
          updateData.candidate_resume = resumeUpload;
        }
      }

      const candidate = await CandidatesRepository.update(id, updateData);

      res.json({
        success: true,
        message: 'Candidate updated successfully',
        data: candidate
      });
    } catch (error) {
      console.error('Error updating candidate:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update candidate',
        error: error.message
      });
    }
  }

  async deleteCandidate(req, res) {
    try {
      const { id } = req.params;
      const deletedBy = req.user?.user_id || null;

      const existingCandidate = await CandidatesRepository.findById(id);
      if (!existingCandidate) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found'
        });
      }

      await CandidatesRepository.softDelete(id, deletedBy);

      res.json({
        success: true,
        message: 'Candidate deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting candidate:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete candidate',
        error: error.message
      });
    }
  }

  async restoreCandidate(req, res) {
    try {
      const { id } = req.params;
      const updatedBy = req.user?.user_id || null;

      const candidate = await CandidatesRepository.restore(id, updatedBy);
      if (!candidate) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found or already restored'
        });
      }

      res.json({
        success: true,
        message: 'Candidate restored successfully',
        data: candidate
      });
    } catch (error) {
      console.error('Error restoring candidate:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to restore candidate',
        error: error.message
      });
    }
  }

  async getCandidateWithRelations(req, res) {
    try {
      const { id } = req.params;

      const candidate = await CandidatesRepository.findByIdWithRelations(id);
      if (!candidate) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found'
        });
      }

      res.json({
        success: true,
        message: 'Candidate with relations retrieved successfully',
        data: candidate
      });
    } catch (error) {
      console.error('Error getting candidate with relations:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get candidate with relations',
        error: error.message
      });
    }
  }

  // POST /candidates/get - Get candidates with POST method
  async getCandidatesPost(req, res) {
    try {
      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['candidate_name', 'candidate_email', 'candidate_phone', 'candidate_age', 'create_at', 'update_at'],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: ['candidate_name', 'candidate_email', 'candidate_phone', 'candidate_city', 'candidate_country'],
        allowedFilters: ['candidate_name', 'candidate_email', 'company_id', 'departement_id', 'title_id', 'gender_id', 'candidate_city', 'candidate_country'],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await CandidatesRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Candidates retrieved successfully');

    } catch (error) {
      console.error('Error getting candidates via POST:', error);
      return sendQueryError(res, 'Failed to get candidates', 500);
    }
  }
}

module.exports = new CandidatesHandler();
