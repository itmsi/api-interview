const { body, param } = require('express-validator');
const { validationResult } = require('express-validator');

const validateCreateNote = [
  body('candidate_id')
    .notEmpty()
    .withMessage('Candidate ID is required')
    .custom((value) => {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) {
        throw new Error('Invalid candidate ID format');
      }
      return true;
    }),
  body('employee_id')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid employee ID format');
        }
      }
      return true;
    }),
  body('notes')
    .notEmpty()
    .withMessage('Notes is required')
    .isLength({ min: 1, max: 5000 })
    .withMessage('Notes must be between 1 and 5000 characters')
    .trim(),
];

const validateUpdateNote = [
  param('id')
    .isUUID()
    .withMessage('Invalid note ID format'),
  body('notes')
    .notEmpty()
    .withMessage('Notes is required')
    .isLength({ min: 1, max: 5000 })
    .withMessage('Notes must be between 1 and 5000 characters')
    .trim(),
];

const validateGetNote = [
  param('id')
    .isUUID()
    .withMessage('Invalid note ID format'),
];

const validateDeleteNote = [
  body('note_id')
    .notEmpty()
    .withMessage('Note ID is required')
    .custom((value) => {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value)) {
        throw new Error('Invalid note ID format');
      }
      return true;
    }),
];

const validateListNotesPost = [
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  body('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Limit must be a positive integer'),
  body('search')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Search term must not exceed 100 characters')
    .trim(),
  body('sort_by')
    .optional()
    .isIn(['create_at', 'update_at', 'notes'])
    .withMessage('Invalid sort field'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  body('candidate_id')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid candidate ID format');
        }
      }
      return true;
    }),
  body('employee_id')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid employee ID format');
        }
      }
      return true;
    }),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateCreateNote,
  validateUpdateNote,
  validateGetNote,
  validateDeleteNote,
  validateListNotesPost,
  handleValidationErrors
};
