const OnBoardDocumentsRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');
const { generateMinioUpload, generateMinioUploadUpdated } = require('../../utils/minio-upload');

class OnBoardDocumentsHandler {
  async createOnBoardDocument(req, res) {
    console.log('=== CREATE ON BOARD DOCUMENT HANDLER CALLED ===');
    console.log('req.file:', req.file);
    console.log('req.body keys:', Object.keys(req.body));
    
    try {
      const {
        candidate_id,
        on_board_documents_name
      } = req.body;

      const createdBy = req.user?.user_id || null;

      // Handle file upload
      let on_board_documents_file = null;

      // Debug: Log received file
      console.log('DEBUG: req.file:', req.file);
      console.log('DEBUG: req.file fieldname:', req.file?.fieldname);

      // Upload on board document file if provided
      if (req.file) {
        // Create a temporary req.files structure for compatibility with generateMinioUpload
        req.files = {
          on_board_documents_file: req.file
        };
        
        const fileUpload = await generateMinioUpload(
          req, 
          'on_board_documents_file', 
          'on-board-documents', 
          'on-board-document',
          '',
          { 
            isWatermark: false, 
            isPrivate: false, 
            isContentType: true 
          }
        );
        
        if (fileUpload.status) {
          on_board_documents_file = fileUpload.pathForDatabase;
        }
      }

      const onBoardDocumentData = {
        candidate_id,
        on_board_documents_name: on_board_documents_name || null,
        on_board_documents_file: on_board_documents_file || null,
        create_by: createdBy
      };

      const onBoardDocument = await OnBoardDocumentsRepository.create(onBoardDocumentData);

      res.status(201).json({
        success: true,
        message: 'On board document created successfully',
        data: onBoardDocument
      });
    } catch (error) {
      console.error('Error creating on board document:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create on board document',
        error: error.message
      });
    }
  }

  async getOnBoardDocument(req, res) {
    try {
      const { id } = req.params;

      const onBoardDocument = await OnBoardDocumentsRepository.findById(id);
      if (!onBoardDocument) {
        return res.status(404).json({
          success: false,
          message: 'On board document not found'
        });
      }

      res.json({
        success: true,
        message: 'On board document retrieved successfully',
        data: onBoardDocument
      });
    } catch (error) {
      console.error('Error getting on board document:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get on board document',
        error: error.message
      });
    }
  }

  async listOnBoardDocuments(req, res) {
    try {
      // Parse query parameters dengan konfigurasi standar
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['on_board_documents_name', 'create_at', 'update_at'],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: ['on_board_documents_name', 'candidate_name', 'candidate_email', 'company_name', 'department_name'],
        allowedFilters: ['candidate_id', 'on_board_documents_name', 'company_id', 'departement_id', 'title_id']
      });

      // Validasi query parameters

      // Get data dengan filter dan pagination
      const result = await OnBoardDocumentsRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'On board documents retrieved successfully');

    } catch (error) {
      console.error('Error listing on board documents:', error);
      return sendQueryError(res, 'Failed to list on board documents', 500);
    }
  }

  async updateOnBoardDocument(req, res) {
    try {
      const { id } = req.params;
      const {
        on_board_documents_name
      } = req.body;

      const updatedBy = req.user?.user_id || null;

      const existingOnBoardDocument = await OnBoardDocumentsRepository.findById(id);
      if (!existingOnBoardDocument) {
        return res.status(404).json({
          success: false,
          message: 'On board document not found'
        });
      }

      const updateData = {
        update_by: updatedBy
      };

      // Update fields only if provided
      if (on_board_documents_name !== undefined) updateData.on_board_documents_name = on_board_documents_name;

      // Handle file upload
      if (req.file) {
        console.log('DEBUG: Updating on board document file...');
        // Create a temporary req.files structure for compatibility with generateMinioUploadUpdated
        req.files = {
          on_board_documents_file: req.file
        };
        
        const fileUpload = await generateMinioUploadUpdated(
          req,
          { num: 'on_board_documents_file', name: 'on-board-document', path: 'on-board-documents' },
          { payload: existingOnBoardDocument.on_board_documents_file },
          existingOnBoardDocument.on_board_documents_file || '', // Use existing file as default
          { 
            isWatermark: false, 
            isPrivate: false, 
            isContentType: true 
          }
        );
        
        console.log('DEBUG: File upload result:', fileUpload);
        updateData.on_board_documents_file = fileUpload; // fileUpload is now directly the URL string
      }

      const onBoardDocument = await OnBoardDocumentsRepository.update(id, updateData);

      res.json({
        success: true,
        message: 'On board document updated successfully',
        data: onBoardDocument
      });
    } catch (error) {
      console.error('Error updating on board document:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update on board document',
        error: error.message
      });
    }
  }

  async deleteOnBoardDocument(req, res) {
    try {
      const { id } = req.params;
      const deletedBy = req.user?.user_id || null;

      const existingOnBoardDocument = await OnBoardDocumentsRepository.findById(id);
      if (!existingOnBoardDocument) {
        return res.status(404).json({
          success: false,
          message: 'On board document not found'
        });
      }

      await OnBoardDocumentsRepository.softDelete(id, deletedBy);

      res.json({
        success: true,
        message: 'On board document deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting on board document:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete on board document',
        error: error.message
      });
    }
  }

  async restoreOnBoardDocument(req, res) {
    try {
      const { id } = req.params;
      const updatedBy = req.user?.user_id || null;

      const onBoardDocument = await OnBoardDocumentsRepository.restore(id, updatedBy);
      if (!onBoardDocument) {
        return res.status(404).json({
          success: false,
          message: 'On board document not found or already restored'
        });
      }

      res.json({
        success: true,
        message: 'On board document restored successfully',
        data: onBoardDocument
      });
    } catch (error) {
      console.error('Error restoring on board document:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to restore on board document',
        error: error.message
      });
    }
  }

  async getOnBoardDocumentWithRelations(req, res) {
    try {
      const { id } = req.params;

      const onBoardDocument = await OnBoardDocumentsRepository.findByIdWithRelations(id);
      if (!onBoardDocument) {
        return res.status(404).json({
          success: false,
          message: 'On board document not found'
        });
      }

      res.json({
        success: true,
        message: 'On board document with relations retrieved successfully',
        data: onBoardDocument
      });
    } catch (error) {
      console.error('Error getting on board document with relations:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get on board document with relations',
        error: error.message
      });
    }
  }

  // POST /on-board-documents/get - Get on board documents with POST method
  async getOnBoardDocumentsPost(req, res) {
    try {
      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['on_board_documents_name', 'create_at', 'update_at'],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: ['on_board_documents_name', 'candidate_name', 'candidate_email', 'company_name', 'department_name'],
        allowedFilters: ['candidate_id', 'on_board_documents_name', 'company_id', 'departement_id', 'title_id'],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters

      // Get data dengan filter dan pagination
      const result = await OnBoardDocumentsRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'On board documents retrieved successfully');

    } catch (error) {
      console.error('Error getting on board documents via POST:', error);
      return sendQueryError(res, 'Failed to get on board documents', 500);
    }
  }

  // GET /on-board-documents/candidate/:candidateId - Get on board documents by candidate ID
  async getOnBoardDocumentsByCandidate(req, res) {
    try {
      const { candidateId } = req.params;

      const onBoardDocuments = await OnBoardDocumentsRepository.findByCandidateId(candidateId);

      res.json({
        success: true,
        message: 'On board documents retrieved successfully',
        data: onBoardDocuments
      });
    } catch (error) {
      console.error('Error getting on board documents by candidate:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get on board documents by candidate',
        error: error.message
      });
    }
  }
}

module.exports = new OnBoardDocumentsHandler();
