const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

const validateCreateCandidate = [
  body('candidate_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Candidate name must not exceed 255 characters')
    .trim(),
  body('candidate_email')
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
    .isLength({ max: 255 })
    .withMessage('Candidate email must not exceed 255 characters')
    .trim(),
  body('candidate_phone')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Candidate phone must not exceed 50 characters')
    .trim(),
  body('candidate_religion')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Candidate religion must not exceed 100 characters')
    .trim(),
  body('candidate_marital_status')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Candidate marital status must not exceed 50 characters')
    .trim(),
  body('candidate_age')
    .optional()
    .isInt({ min: 0, max: 120 })
    .withMessage('Candidate age must be between 0 and 120'),
  body('candidate_date_birth')
    .optional()
    .isDate()
    .withMessage('Invalid date format for candidate date birth'),
  body('candidate_nationality')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Candidate nationality must not exceed 100 characters')
    .trim(),
  body('candidate_city')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Candidate city must not exceed 100 characters')
    .trim(),
  body('candidate_state')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Candidate state must not exceed 100 characters')
    .trim(),
  body('candidate_country')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Candidate country must not exceed 100 characters')
    .trim(),
  body('candidate_address')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Candidate address must not exceed 1000 characters')
    .trim(),
  body('candidate_number')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Candidate number must not exceed 100 characters')
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
];

const validateUpdateCandidate = [
  param('id')
    .isUUID()
    .withMessage('Invalid candidate ID format'),
  ...validateCreateCandidate
];

const validateGetCandidate = [
  param('id')
    .isUUID()
    .withMessage('Invalid candidate ID format'),
];

const validateDeleteCandidate = [
  param('id')
    .isUUID()
    .withMessage('Invalid candidate ID format'),
];

const validateListCandidates = [
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
    .isIn(['candidate_name', 'candidate_email', 'candidate_phone', 'candidate_age', 'create_at', 'update_at'])
    .withMessage('Invalid sort field'),
  query('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  query('candidate_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Candidate name filter must not exceed 255 characters')
    .trim(),
  query('candidate_email')
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
    .isLength({ max: 255 })
    .withMessage('Candidate email filter must not exceed 255 characters')
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
  query('candidate_city')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Candidate city filter must not exceed 100 characters')
    .trim(),
  query('candidate_country')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Candidate country filter must not exceed 100 characters')
    .trim(),
];

const validateListCandidatesPost = [
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
    .isIn(['candidate_name', 'candidate_email', 'candidate_phone', 'candidate_age', 'create_at', 'update_at'])
    .withMessage('Invalid sort field'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  body('candidate_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Candidate name filter must not exceed 255 characters')
    .trim(),
  body('candidate_email')
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
    .isLength({ max: 255 })
    .withMessage('Candidate email filter must not exceed 255 characters')
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
  body('candidate_city')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Candidate city filter must not exceed 100 characters')
    .trim(),
  body('candidate_country')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Candidate country filter must not exceed 100 characters')
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
  validateCreateCandidate,
  validateUpdateCandidate,
  validateGetCandidate,
  validateDeleteCandidate,
  validateListCandidates,
  validateListCandidatesPost,
  handleValidationErrors
};
