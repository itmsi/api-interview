const { body, query } = require('express-validator');
const { validationResult } = require('express-validator');

const validateGetReviewInterviewData = [
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
    .isLength({ max: 255 })
    .withMessage('Search term must not exceed 255 characters')
    .trim(),
  body('sort_by')
    .optional()
    .isIn(['candidate_name', 'candidate_email', 'company_name', 'title_name', 'create_at'])
    .withMessage('Invalid sort field'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  body('interview_id')
    .optional()
    .isUUID()
    .withMessage('Interview ID must be a valid UUID'),
  body('candidate_id')
    .optional()
    .isUUID()
    .withMessage('Candidate ID must be a valid UUID'),
  body('company_id')
    .optional()
    .isUUID()
    .withMessage('Company ID must be a valid UUID'),
  body('title_id')
    .optional()
    .isUUID()
    .withMessage('Title ID must be a valid UUID'),
  body('departement_id')
    .optional()
    .isUUID()
    .withMessage('Department ID must be a valid UUID'),
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
  validateGetReviewInterviewData,
  handleValidationErrors
};
