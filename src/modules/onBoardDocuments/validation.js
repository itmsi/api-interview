const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

const validateCreateOnBoardDocument = [
  body('candidate_id')
    .notEmpty()
    .withMessage('Candidate ID is required')
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid candidate ID format');
        }
      }
      return true;
    }),
  body('on_board_documents_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('On board documents name must not exceed 255 characters')
    .trim(),
];

const validateUpdateOnBoardDocument = [
  param('id')
    .isUUID()
    .withMessage('Invalid on board document ID format'),
  body('on_board_documents_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('On board documents name must not exceed 255 characters')
    .trim(),
];

const validateGetOnBoardDocument = [
  param('id')
    .isUUID()
    .withMessage('Invalid on board document ID format'),
];

const validateDeleteOnBoardDocument = [
  param('id')
    .isUUID()
    .withMessage('Invalid on board document ID format'),
];

const validateListOnBoardDocuments = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Limit must be a positive integer'),
  query('search')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Search term must not exceed 100 characters')
    .trim(),
  query('sort_by')
    .optional()
    .isIn(['on_board_documents_name', 'create_at', 'update_at'])
    .withMessage('Invalid sort field'),
  query('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  query('candidate_id')
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
  query('on_board_documents_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('On board documents name filter must not exceed 255 characters')
    .trim(),
  query('company_id')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid company ID format');
        }
      }
      return true;
    }),
  query('departement_id')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid department ID format');
        }
      }
      return true;
    }),
  query('title_id')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid title ID format');
        }
      }
      return true;
    }),
];

const validateListOnBoardDocumentsPost = [
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
    .isIn(['on_board_documents_name', 'create_at', 'update_at'])
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
  body('on_board_documents_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('On board documents name filter must not exceed 255 characters')
    .trim(),
  body('company_id')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid company ID format');
        }
      }
      return true;
    }),
  body('departement_id')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid department ID format');
        }
      }
      return true;
    }),
  body('title_id')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid title ID format');
        }
      }
      return true;
    }),
];

const validateGetOnBoardDocumentsByCandidate = [
  param('candidateId')
    .isUUID()
    .withMessage('Invalid candidate ID format'),
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
  validateCreateOnBoardDocument,
  validateUpdateOnBoardDocument,
  validateGetOnBoardDocument,
  validateDeleteOnBoardDocument,
  validateListOnBoardDocuments,
  validateListOnBoardDocumentsPost,
  validateGetOnBoardDocumentsByCandidate,
  handleValidationErrors
};
