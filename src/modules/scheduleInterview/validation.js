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

// Array of UUID validation helper
const uuidArrayValidation = (value) => {
  if (value) {
    if (Array.isArray(value)) {
      value.forEach(uuid => {
        if (uuid && uuid.trim() !== '') {
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
          if (!uuidRegex.test(uuid)) {
            throw new Error('Invalid UUID format in array');
          }
        }
      });
    } else {
      throw new Error('employee_id must be an array');
    }
  }
  return true;
};

const validateCreateScheduleInterview = [
  body('candidate_id')
    .notEmpty()
    .withMessage('Candidate ID is required')
    .custom(uuidValidation),
  body('assign_role')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Assign role must not exceed 255 characters')
    .trim(),
  body('employee_id')
    .optional()
    .custom(uuidArrayValidation),
  body('schedule_interview_date')
    .optional()
    .isDate()
    .withMessage('Invalid date format for schedule interview date'),
  body('schedule_interview_time')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM:SS)'),
  body('schedule_interview_duration')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Schedule interview duration must not exceed 100 characters')
    .trim()
];

const validateUpdateScheduleInterview = [
  param('id')
    .isUUID()
    .withMessage('Invalid schedule interview ID format'),
  body('assign_role')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Assign role must not exceed 255 characters')
    .trim(),
  body('employee_id')
    .optional()
    .custom(uuidArrayValidation),
  body('schedule_interview_date')
    .optional()
    .isDate()
    .withMessage('Invalid date format for schedule interview date'),
  body('schedule_interview_time')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM:SS)'),
  body('schedule_interview_duration')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Schedule interview duration must not exceed 100 characters')
    .trim()
];

const validateGetScheduleInterview = [
  param('id')
    .isUUID()
    .withMessage('Invalid schedule interview ID format')
];

const validateDeleteScheduleInterview = [
  param('id')
    .isUUID()
    .withMessage('Invalid schedule interview ID format')
];

const validateListScheduleInterviews = [
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
    .isIn(['schedule_interview_date', 'schedule_interview_time', 'assign_role', 'create_at', 'update_at'])
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
  query('schedule_interview_date')
    .optional()
    .isDate()
    .withMessage('Invalid date format for schedule interview date'),
  query('schedule_interview_time')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM:SS)'),
  query('schedule_interview_duration')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Schedule interview duration must not exceed 100 characters')
    .trim()
];

const validateListScheduleInterviewsPost = [
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
    .isIn(['schedule_interview_date', 'schedule_interview_time', 'assign_role', 'create_at', 'update_at'])
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
  body('schedule_interview_date')
    .optional()
    .isDate()
    .withMessage('Invalid date format for schedule interview date'),
  body('schedule_interview_time')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('Invalid time format (HH:MM:SS)'),
  body('schedule_interview_duration')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Schedule interview duration must not exceed 100 characters')
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
  validateCreateScheduleInterview,
  validateUpdateScheduleInterview,
  validateGetScheduleInterview,
  validateDeleteScheduleInterview,
  validateListScheduleInterviews,
  validateListScheduleInterviewsPost,
  handleValidationErrors
};
