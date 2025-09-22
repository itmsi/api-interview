const NotesRepository = require('./postgre_repository');
const { 
  parseStandardQuery, 
  sendQuerySuccess, 
  sendQueryError 
} = require('../../utils');

class NotesHandler {
  async createNote(req, res) {
    try {
      const {
        candidate_id,
        employee_id,
        notes
      } = req.body;

      const createdBy = req.user?.user_id || null;

      const noteData = {
        candidate_id,
        employee_id: employee_id || null,
        notes,
        create_by: createdBy
      };

      const note = await NotesRepository.create(noteData);

      res.status(201).json({
        success: true,
        message: 'Note created successfully',
        data: note
      });
    } catch (error) {
      console.error('Error creating note:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create note',
        error: error.message
      });
    }
  }

  async getNote(req, res) {
    try {
      const { id } = req.params;

      const note = await NotesRepository.findById(id);
      if (!note) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      res.json({
        success: true,
        message: 'Note retrieved successfully',
        data: note
      });
    } catch (error) {
      console.error('Error getting note:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get note',
        error: error.message
      });
    }
  }

  async updateNote(req, res) {
    try {
      const { id } = req.params;
      const { notes } = req.body;

      const updatedBy = req.user?.user_id || null;

      const existingNote = await NotesRepository.findById(id);
      if (!existingNote) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      const updateData = {
        notes,
        update_by: updatedBy
      };

      const note = await NotesRepository.update(id, updateData);

      res.json({
        success: true,
        message: 'Note updated successfully',
        data: note
      });
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update note',
        error: error.message
      });
    }
  }

  async deleteNote(req, res) {
    try {
      const { note_id } = req.body;
      const deletedBy = req.user?.user_id || null;

      const existingNote = await NotesRepository.findById(note_id);
      if (!existingNote) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      await NotesRepository.softDelete(note_id, deletedBy);

      res.json({
        success: true,
        message: 'Note deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete note',
        error: error.message
      });
    }
  }

  async restoreNote(req, res) {
    try {
      const { id } = req.params;
      const updatedBy = req.user?.user_id || null;

      const note = await NotesRepository.restore(id, updatedBy);
      if (!note) {
        return res.status(404).json({
          success: false,
          message: 'Note not found or already restored'
        });
      }

      res.json({
        success: true,
        message: 'Note restored successfully',
        data: note
      });
    } catch (error) {
      console.error('Error restoring note:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to restore note',
        error: error.message
      });
    }
  }

  async getNoteWithRelations(req, res) {
    try {
      const { id } = req.params;

      const note = await NotesRepository.findByIdWithRelations(id);
      if (!note) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      res.json({
        success: true,
        message: 'Note with relations retrieved successfully',
        data: note
      });
    } catch (error) {
      console.error('Error getting note with relations:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get note with relations',
        error: error.message
      });
    }
  }

  // POST /notes/get - Get notes with POST method
  async getNotesPost(req, res) {
    try {
      // Parse query parameters dari body request
      const queryParams = parseStandardQuery(req, {
        allowedColumns: ['notes', 'create_at', 'update_at'],
        defaultOrder: ['create_at', 'desc'],
        searchableColumns: ['notes'],
        allowedFilters: ['candidate_id', 'employee_id'],
        fromBody: true // Mengambil parameter dari body, bukan query string
      });

      // Validasi query parameters
      if (queryParams.pagination.limit > 100) {
        return sendQueryError(res, 'Limit tidak boleh lebih dari 100', 400);
      }

      // Get data dengan filter dan pagination
      const result = await NotesRepository.findWithFilters(queryParams);

      // Send success response
      return sendQuerySuccess(res, result, 'Notes retrieved successfully');

    } catch (error) {
      console.error('Error getting notes via POST:', error);
      return sendQueryError(res, 'Failed to get notes', 500);
    }
  }
}

module.exports = new NotesHandler();
