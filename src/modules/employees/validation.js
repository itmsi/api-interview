const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

const validateGetEmployee = [
  param('id')
    .isUUID()
    .withMessage('Invalid employee ID format'),
];

const validateListEmployees = [
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
    .isIn(['employee_name', 'employee_email', 'employee_mobile', 'employee_activation_status', 'created_at', 'updated_at'])
    .withMessage('Invalid sort field'),
  query('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  query('employee_name')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Employee name filter must not exceed 100 characters')
    .trim(),
  query('employee_email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ max: 100 })
    .withMessage('Employee email filter must not exceed 100 characters')
    .trim(),
  query('title_id')
    .optional()
    .isUUID()
    .withMessage('Invalid title ID format'),
  query('department_id')
    .optional()
    .isUUID()
    .withMessage('Invalid department ID format'),
  query('gender_id')
    .optional()
    .isUUID()
    .withMessage('Invalid gender ID format'),
  query('island_id')
    .optional()
    .isUUID()
    .withMessage('Invalid island ID format'),
  query('employee_activation_status')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Employee activation status filter must not exceed 50 characters')
    .trim(),
  query('employee_disabled')
    .optional()
    .isBoolean()
    .withMessage('Employee disabled must be a boolean value'),
];

const validateListEmployeesPost = [
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
    .isIn(['employee_name', 'employee_email', 'employee_mobile', 'employee_activation_status', 'created_at', 'updated_at'])
    .withMessage('Invalid sort field'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  body('employee_name')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Employee name filter must not exceed 100 characters')
    .trim(),
  body('employee_email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .isLength({ max: 100 })
    .withMessage('Employee email filter must not exceed 100 characters')
    .trim(),
  body('title_id')
    .optional()
    .isUUID()
    .withMessage('Invalid title ID format'),
  body('department_id')
    .optional()
    .isUUID()
    .withMessage('Invalid department ID format'),
  body('gender_id')
    .optional()
    .isUUID()
    .withMessage('Invalid gender ID format'),
  body('island_id')
    .optional()
    .isUUID()
    .withMessage('Invalid island ID format'),
  body('employee_activation_status')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Employee activation status filter must not exceed 50 characters')
    .trim(),
  body('employee_disabled')
    .optional()
    .isBoolean()
    .withMessage('Employee disabled must be a boolean value'),
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
  validateGetEmployee,
  validateListEmployees,
  validateListEmployeesPost,
  handleValidationErrors
};
