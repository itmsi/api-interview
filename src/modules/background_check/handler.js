const BackgroundCheckRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');
const { generateMinioUpload, generateMinioUploadUpdated } = require('../../utils/minio-upload');

class BackgroundCheckHandler {
  async createBackgroundCheck(req, res) {
    console.log('=== CREATE BACKGROUND CHECK HANDLER CALLED ===');
    console.log('req.files:', req.files);
    console.log('req.body keys:', Object.keys(req.body));
    
    try {
      const {
        candidate_id,
        background_check_status,
        background_check_note
      } = req.body;

      const createdBy = req.user?.user_id || null;

      // Handle file upload
      let file_attachment = null;

      // Upload file attachment if provided
      if (req.file) {
        
        // Create a temporary req.files structure for generateMinioUpload
        const tempReq = {
          ...req,
          files: {
            file_attachment: req.file
          }
        };
        
        const fileUpload = await generateMinioUpload(
          tempReq, 
          'file_attachment', 
          'background_check/attachments', 
          'background-check-attachment',
          '',
          { 
            isWatermark: false, 
            isPrivate: false, 
            isContentType: true 
          }
        );
        
        if (fileUpload.status) {
          file_attachment = fileUpload.pathForDatabase;
        }
      }

      const backgroundCheckData = {
        candidate_id,
        background_check_status,
        background_check_note,
        file_attachment: file_attachment || null,
        create_by: createdBy
      };

      const backgroundCheck = await BackgroundCheckRepository.create(backgroundCheckData);

      res.status(201).json({
        success: true,
        message: 'Background check created successfully',
        data: backgroundCheck
      });
    } catch (error) {
      console.error('Error creating background check:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create background check',
        error: error.message
      });
    }
  }

  async getBackgroundCheck(req, res) {
    try {
      const { id } = req.params;

      const backgroundCheck = await BackgroundCheckRepository.findById(id);
      if (!backgroundCheck) {
        return res.status(404).json({
          success: false,
          message: 'Background check not found'
        });
      }

      res.json({
        success: true,
        message: 'Background check retrieved successfully',
        data: backgroundCheck
      });
    } catch (error) {
      console.error('Error getting background check:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get background check',
        error: error.message
      });
    }
  }

  async listBackgroundChecks(req, res) {
    try {
      // Parse query parameters dengan konfigurasi standar
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['background_check_status', 'create_at', 'update_at'],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: ['background_check_note', 'background_check_status', 'candidate_name', 'candidate_email'],
        allowedFilters: ['candidate_id', 'background_check_status']
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await BackgroundCheckRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Background checks retrieved successfully');

    } catch (error) {
      console.error('Error listing background checks:', error);
      return sendQueryError(res, 'Failed to list background checks', 500);
    }
  }

  async updateBackgroundCheck(req, res) {
    try {
      const { id } = req.params;
      const {
        background_check_status,
        background_check_note
      } = req.body;

      const updatedBy = req.user?.user_id || null;

      const existingBackgroundCheck = await BackgroundCheckRepository.findById(id);
      if (!existingBackgroundCheck) {
        return res.status(404).json({
          success: false,
          message: 'Background check not found'
        });
      }

      const updateData = {
        update_by: updatedBy
      };

      // Update fields only if provided
      if (background_check_status !== undefined) updateData.background_check_status = background_check_status;
      if (background_check_note !== undefined) updateData.background_check_note = background_check_note;

      // Handle file upload
      if (req.file) {
        
        // Create a temporary req.files structure for generateMinioUploadUpdated
        const tempReq = {
          ...req,
          files: {
            file_attachment: req.file
          }
        };
        
        const fileUpload = await generateMinioUploadUpdated(
          tempReq,
          { num: 'file_attachment', name: 'background-check-attachment', path: 'background_check/attachments' },
          { payload: existingBackgroundCheck.file_attachment },
          existingBackgroundCheck.file_attachment || '', // Use existing file as default
          { 
            isWatermark: false, 
            isPrivate: false, 
            isContentType: true 
          }
        );
        
        updateData.file_attachment = fileUpload; // fileUpload is now directly the URL string
      }

      const backgroundCheck = await BackgroundCheckRepository.update(id, updateData);

      res.json({
        success: true,
        message: 'Background check updated successfully',
        data: backgroundCheck
      });
    } catch (error) {
      console.error('Error updating background check:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update background check',
        error: error.message
      });
    }
  }

  async deleteBackgroundCheck(req, res) {
    try {
      const { id } = req.params;
      const deletedBy = req.user?.user_id || null;

      const existingBackgroundCheck = await BackgroundCheckRepository.findById(id);
      if (!existingBackgroundCheck) {
        return res.status(404).json({
          success: false,
          message: 'Background check not found'
        });
      }

      await BackgroundCheckRepository.softDelete(id, deletedBy);

      res.json({
        success: true,
        message: 'Background check deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting background check:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete background check',
        error: error.message
      });
    }
  }

  async restoreBackgroundCheck(req, res) {
    try {
      const { id } = req.params;
      const updatedBy = req.user?.user_id || null;

      const backgroundCheck = await BackgroundCheckRepository.restore(id, updatedBy);
      if (!backgroundCheck) {
        return res.status(404).json({
          success: false,
          message: 'Background check not found or already restored'
        });
      }

      res.json({
        success: true,
        message: 'Background check restored successfully',
        data: backgroundCheck
      });
    } catch (error) {
      console.error('Error restoring background check:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to restore background check',
        error: error.message
      });
    }
  }

  async getBackgroundCheckWithRelations(req, res) {
    try {
      const { id } = req.params;

      const backgroundCheck = await BackgroundCheckRepository.findByIdWithRelations(id);
      if (!backgroundCheck) {
        return res.status(404).json({
          success: false,
          message: 'Background check not found'
        });
      }

      res.json({
        success: true,
        message: 'Background check with relations retrieved successfully',
        data: backgroundCheck
      });
    } catch (error) {
      console.error('Error getting background check with relations:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get background check with relations',
        error: error.message
      });
    }
  }

  // POST /background-checks/get - Get background checks with POST method
  async getBackgroundChecksPost(req, res) {
    try {
      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['background_check_status', 'create_at', 'update_at'],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: ['background_check_note', 'background_check_status', 'candidate_name', 'candidate_email'],
        allowedFilters: ['candidate_id', 'background_check_status'],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await BackgroundCheckRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Background checks retrieved successfully');

    } catch (error) {
      console.error('Error getting background checks via POST:', error);
      return sendQueryError(res, 'Failed to get background checks', 500);
    }
  }

  // GET /background-checks/candidate/:candidateId - Get background checks by candidate ID
  async getBackgroundChecksByCandidate(req, res) {
    try {
      const { candidateId } = req.params;

      const backgroundChecks = await BackgroundCheckRepository.findByCandidateId(candidateId);

      res.json({
        success: true,
        message: 'Background checks for candidate retrieved successfully',
        data: backgroundChecks
      });
    } catch (error) {
      console.error('Error getting background checks by candidate:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get background checks by candidate',
        error: error.message
      });
    }
  }
}

module.exports = new BackgroundCheckHandler();
