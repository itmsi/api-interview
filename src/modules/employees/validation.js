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
    .custom((value) => {
      if (value && value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          throw new Error('Invalid email format');
        }
      }
      return true;
    })
    .isLength({ max: 100 })
    .withMessage('Employee email filter must not exceed 100 characters')
    .trim(),
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
  query('department_id')
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
  query('gender_id')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid gender ID format');
        }
      }
      return true;
    }),
  query('island_id')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid island ID format');
        }
      }
      return true;
    }),
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
    .custom((value) => {
      if (value && value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          throw new Error('Invalid email format');
        }
      }
      return true;
    })
    .isLength({ max: 100 })
    .withMessage('Employee email filter must not exceed 100 characters')
    .trim(),
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
  body('department_id')
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
  body('gender_id')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid gender ID format');
        }
      }
      return true;
    }),
  body('island_id')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(value)) {
          throw new Error('Invalid island ID format');
        }
      }
      return true;
    }),
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
