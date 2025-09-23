const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

// UUID validation helper
const uuidValidation = (value) => {
  if (value && value.trim() !== '') {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error('Invalid UUID format');
    }
  }
  return true;
};

const validateCreateInterview = [
  body('schedule_interview_id')
    .notEmpty()
    .withMessage('Schedule Interview ID is required')
    .custom(uuidValidation),
  body('company_value')
    .notEmpty()
    .withMessage('Company value is required')
    .isLength({ max: 255 })
    .withMessage('Company value must not exceed 255 characters')
    .trim(),
  body('comment')
    .optional()
    .trim(),
  body('employee_id')
    .optional()
    .custom(uuidValidation),
  body('aspect')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Aspect must not exceed 255 characters')
    .trim(),
  body('question')
    .optional()
    .trim(),
  body('answer')
    .optional()
    .trim(),
  body('score')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Score must be an integer between 0 and 100')
];

const validateUpdateInterview = [
  param('id')
    .isUUID()
    .withMessage('Invalid interview ID format'),
  body('schedule_interview_id')
    .optional()
    .custom(uuidValidation),
  body('company_value')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Company value must not exceed 255 characters')
    .trim(),
  body('comment')
    .optional()
    .trim(),
  body('employee_id')
    .optional()
    .custom(uuidValidation),
  body('aspect')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Aspect must not exceed 255 characters')
    .trim(),
  body('question')
    .optional()
    .trim(),
  body('answer')
    .optional()
    .trim(),
  body('score')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Score must be an integer between 0 and 100')
];

const validateGetInterview = [
  param('id')
    .isUUID()
    .withMessage('Invalid interview ID format')
];

const validateDeleteInterview = [
  param('id')
    .isUUID()
    .withMessage('Invalid interview ID format')
];

const validateListInterviews = [
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
    .isIn(['company_value', 'create_at', 'update_at', 'schedule_interview_date'])
    .withMessage('Invalid sort field'),
  query('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  query('schedule_interview_id')
    .optional()
    .custom(uuidValidation),
  query('employee_id')
    .optional()
    .custom(uuidValidation),
  query('company_value')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Company value must not exceed 255 characters')
    .trim()
];

const validateListInterviewsPost = [
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
    .isIn(['company_value', 'create_at', 'update_at', 'schedule_interview_date'])
    .withMessage('Invalid sort field'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  body('schedule_interview_id')
    .optional()
    .custom(uuidValidation),
  body('employee_id')
    .optional()
    .custom(uuidValidation),
  body('company_value')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Company value must not exceed 255 characters')
    .trim()
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
  validateCreateInterview,
  validateUpdateInterview,
  validateGetInterview,
  validateDeleteInterview,
  validateListInterviews,
  validateListInterviewsPost,
  handleValidationErrors
};
