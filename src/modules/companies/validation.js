const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

const validateGetCompany = [
  param('id')
    .isUUID()
    .withMessage('Invalid company ID format'),
];

const validateListCompanies = [
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
    .isIn(['company_name', 'company_email', 'created_at', 'updated_at'])
    .withMessage('Invalid sort field'),
  query('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  query('company_name')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Company name filter must not exceed 100 characters')
    .trim(),
  query('company_email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ max: 100 })
    .withMessage('Company email filter must not exceed 100 characters')
    .trim(),
];

const validateListCompaniesPost = [
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
    .isIn(['company_name', 'company_email', 'created_at', 'updated_at'])
    .withMessage('Invalid sort field'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  body('company_name')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Company name filter must not exceed 100 characters')
    .trim(),
  body('company_email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ max: 100 })
    .withMessage('Company email filter must not exceed 100 characters')
    .trim(),
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
  validateGetCompany,
  validateListCompanies,
  validateListCompaniesPost,
  handleValidationErrors
};
