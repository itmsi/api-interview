const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

const validateCreateBackgroundCheck = [
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
  body('background_check_status')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Background check status must not exceed 255 characters')
    .trim(),
  body('background_check_note')
    .optional()
    .isLength({ max: 2000 })
    .withMessage('Background check note must not exceed 2000 characters')
    .trim(),
];

const validateUpdateBackgroundCheck = [
  param('id')
    .isUUID()
    .withMessage('Invalid background check ID format'),
  body('background_check_status')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Background check status must not exceed 255 characters')
    .trim(),
  body('background_check_note')
    .optional()
    .isLength({ max: 2000 })
    .withMessage('Background check note must not exceed 2000 characters')
    .trim(),
];

const validateGetBackgroundCheck = [
  param('id')
    .isUUID()
    .withMessage('Invalid background check ID format'),
];

const validateDeleteBackgroundCheck = [
  param('id')
    .isUUID()
    .withMessage('Invalid background check ID format'),
];

const validateListBackgroundChecks = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('search')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Search term must not exceed 100 characters')
    .trim(),
  query('sort_by')
    .optional()
    .isIn(['background_check_status', 'create_at', 'update_at'])
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
  query('background_check_status')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Background check status filter must not exceed 255 characters')
    .trim(),
];

const validateListBackgroundChecksPost = [
  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  body('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  body('search')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Search term must not exceed 100 characters')
    .trim(),
  body('sort_by')
    .optional()
    .isIn(['background_check_status', 'create_at', 'update_at'])
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
  body('background_check_status')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Background check status filter must not exceed 255 characters')
    .trim(),
];

const validateGetBackgroundChecksByCandidate = [
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
  validateCreateBackgroundCheck,
  validateUpdateBackgroundCheck,
  validateGetBackgroundCheck,
  validateDeleteBackgroundCheck,
  validateListBackgroundChecks,
  validateListBackgroundChecksPost,
  validateGetBackgroundChecksByCandidate,
  handleValidationErrors
};
