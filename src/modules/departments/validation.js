const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

const validateGetDepartment = [
  param('id')
    .isUUID()
    .withMessage('Invalid department ID format'),
];

const validateListDepartments = [
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
    .isIn(['department_name', 'department_segmentasi', 'created_at', 'updated_at'])
    .withMessage('Invalid sort field'),
  query('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  query('department_name')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Department name filter must not exceed 100 characters')
    .trim(),
  query('department_segmentasi')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Department segmentasi filter must not exceed 100 characters')
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
];

const validateListDepartmentsPost = [
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
    .isIn(['department_name', 'department_segmentasi', 'created_at', 'updated_at'])
    .withMessage('Invalid sort field'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  body('department_name')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Department name filter must not exceed 100 characters')
    .trim(),
  body('department_segmentasi')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Department segmentasi filter must not exceed 100 characters')
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
  validateGetDepartment,
  validateListDepartments,
  validateListDepartmentsPost,
  handleValidationErrors
};
