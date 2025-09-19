const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

const validateGetTitle = [
  param('id')
    .isUUID()
    .withMessage('Invalid title ID format'),
];

const validateListTitles = [
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
    .isIn(['title_name', 'created_at', 'updated_at'])
    .withMessage('Invalid sort field'),
  query('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  query('title_name')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Title name filter must not exceed 100 characters')
    .trim(),
  query('department_id')
    .optional()
    .isUUID()
    .withMessage('Invalid department ID format'),
];

const validateListTitlesPost = [
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
    .isIn(['title_name', 'created_at', 'updated_at'])
    .withMessage('Invalid sort field'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  body('title_name')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Title name filter must not exceed 100 characters')
    .trim(),
  body('department_id')
    .optional()
    .isUUID()
    .withMessage('Invalid department ID format'),
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
  validateGetTitle,
  validateListTitles,
  validateListTitlesPost,
  handleValidationErrors
};
