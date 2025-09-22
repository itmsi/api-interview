const { body, param, query } = require('express-validator');
const { validationResult } = require('express-validator');

// UUID validation helper
const validateUUID = (value) => {
  if (value && value.trim() !== '') {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new Error('Invalid UUID format');
    }
  }
  return true;
};

// Email validation helper
const validateEmail = (value) => {
  if (value && value.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format');
    }
  }
  return true;
};

// Date validation helper
const validateDate = (value) => {
  if (value && value.trim() !== '') {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
  }
  return true;
};

// Validation for education background array
const validateEducationBackgrounds = [
  body('education_backgrounds')
    .optional()
    .isArray()
    .withMessage('Education backgrounds must be an array'),
  body('education_backgrounds.*.type_of_school')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Type of school must not exceed 255 characters')
    .trim(),
  body('education_backgrounds.*.name_of_school')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Name of school must not exceed 255 characters')
    .trim(),
  body('education_backgrounds.*.location_of_school')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Location of school must not exceed 1000 characters')
    .trim(),
  body('education_backgrounds.*.grade_of_school')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Grade of school must not exceed 100 characters')
    .trim(),
  body('education_backgrounds.*.major_of_school')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Major of school must not exceed 255 characters')
    .trim(),
];

// Validation for informal education qualifications array
const validateInformalEducationQualifications = [
  body('informal_education_qualifications')
    .optional()
    .isArray()
    .withMessage('Informal education qualifications must be an array'),
  body('informal_education_qualifications.*.type_of_training')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Type of training must not exceed 255 characters')
    .trim(),
  body('informal_education_qualifications.*.institute_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Institute name must not exceed 255 characters')
    .trim(),
  body('informal_education_qualifications.*.location_of_institute')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Location of institute must not exceed 1000 characters')
    .trim(),
  body('informal_education_qualifications.*.certificate_of_training')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Certificate of training must not exceed 255 characters')
    .trim(),
  body('informal_education_qualifications.*.period_of_training')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Period of training must not exceed 100 characters')
    .trim(),
];

// Validation for family backgrounds array
const validateFamilyBackgrounds = [
  body('family_backgrounds')
    .optional()
    .isArray()
    .withMessage('Family backgrounds must be an array'),
  body('family_backgrounds.*.relationship_of_family_member')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Relationship of family member must not exceed 100 characters')
    .trim(),
  body('family_backgrounds.*.name_of_family_member')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Name of family member must not exceed 255 characters')
    .trim(),
  body('family_backgrounds.*.age_of_family_member')
    .optional()
    .isLength({ max: 10 })
    .withMessage('Age of family member must not exceed 10 characters')
    .trim(),
  body('family_backgrounds.*.employment_status_of_family_member')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Employment status of family member must not exceed 255 characters')
    .trim(),
  body('family_backgrounds.*.emergency_contact_of_family_member')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Emergency contact of family member must not exceed 50 characters')
    .trim(),
];

// Validation for work experiences array
const validateWorkExperiences = [
  body('work_experiences')
    .optional()
    .isArray()
    .withMessage('Work experiences must be an array'),
  body('work_experiences.*.company_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Company name must not exceed 255 characters')
    .trim(),
  body('work_experiences.*.start_date_of_work')
    .optional()
    .custom(validateDate)
    .withMessage('Invalid start date format'),
  body('work_experiences.*.end_date_of_work')
    .optional()
    .custom(validateDate)
    .withMessage('Invalid end date format'),
  body('work_experiences.*.pay_per_month')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Pay per month must not exceed 100 characters')
    .trim(),
  body('work_experiences.*.name_of_supervisor')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Name of supervisor must not exceed 255 characters')
    .trim(),
  body('work_experiences.*.reason_for_leaving')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Reason for leaving must not exceed 1000 characters')
    .trim(),
];

// Validation for references array
const validateReferences = [
  body('references')
    .optional()
    .isArray()
    .withMessage('References must be an array'),
  body('references.*.name_of_reference')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Name of reference must not exceed 255 characters')
    .trim(),
  body('references.*.position_of_reference')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Position of reference must not exceed 255 characters')
    .trim(),
  body('references.*.phone_number_of_reference')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Phone number of reference must not exceed 50 characters')
    .trim(),
];

// Main applicant information validation
const validateApplicantInformation = [
  body('first_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('First name must not exceed 255 characters')
    .trim(),
  body('middle_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Middle name must not exceed 255 characters')
    .trim(),
  body('last_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Last name must not exceed 255 characters')
    .trim(),
  body('mobile')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Mobile must not exceed 50 characters')
    .trim(),
  body('email')
    .optional()
    .custom(validateEmail)
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters')
    .trim(),
  body('id_number')
    .optional()
    .isLength({ max: 100 })
    .withMessage('ID number must not exceed 100 characters')
    .trim(),
  body('position_applied_for')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Position applied for must not exceed 255 characters')
    .trim(),
  body('expected_salary')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Expected salary must not exceed 100 characters')
    .trim(),
  body('emergency_contact')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Emergency contact must not exceed 50 characters')
    .trim(),
  body('present_address')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Present address must not exceed 1000 characters')
    .trim(),
  body('city')
    .optional()
    .isLength({ max: 100 })
    .withMessage('City must not exceed 100 characters')
    .trim(),
  body('date_of_birth')
    .optional()
    .custom(validateDate)
    .withMessage('Invalid date of birth format'),
  body('blood_type')
    .optional()
    .isLength({ max: 10 })
    .withMessage('Blood type must not exceed 10 characters')
    .trim(),
  body('tax_identification_number')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Tax identification number must not exceed 100 characters')
    .trim(),
  body('working_available_date')
    .optional()
    .custom(validateDate)
    .withMessage('Invalid working available date format'),
  body('religion')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Religion must not exceed 100 characters')
    .trim(),
];

// Combined validation for create applicant
const validateCreateApplicant = [
  ...validateApplicantInformation,
  ...validateEducationBackgrounds,
  ...validateInformalEducationQualifications,
  ...validateFamilyBackgrounds,
  ...validateWorkExperiences,
  ...validateReferences,
];

// Combined validation for update applicant
const validateUpdateApplicant = [
  param('applicate_id')
    .custom(validateUUID)
    .withMessage('Invalid applicant ID format'),
  ...validateApplicantInformation,
  ...validateEducationBackgrounds,
  ...validateInformalEducationQualifications,
  ...validateFamilyBackgrounds,
  ...validateWorkExperiences,
  ...validateReferences,
];

// Validation for get applicant by ID
const validateGetApplicant = [
  param('applicate_id')
    .custom(validateUUID)
    .withMessage('Invalid applicant ID format'),
];

// Validation for delete applicant
const validateDeleteApplicant = [
  param('applicate_id')
    .custom(validateUUID)
    .withMessage('Invalid applicant ID format'),
];

// Validation for list applicants (GET method)
const validateListApplicants = [
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
    .isIn(['first_name', 'last_name', 'email', 'mobile', 'position_applied_for', 'create_at', 'update_at'])
    .withMessage('Invalid sort field'),
  query('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  query('applicate_id')
    .optional()
    .custom(validateUUID)
    .withMessage('Invalid applicant ID format'),
  query('first_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('First name filter must not exceed 255 characters')
    .trim(),
  query('middle_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Middle name filter must not exceed 255 characters')
    .trim(),
  query('last_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Last name filter must not exceed 255 characters')
    .trim(),
  query('mobile')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Mobile filter must not exceed 50 characters')
    .trim(),
  query('email')
    .optional()
    .custom(validateEmail)
    .isLength({ max: 255 })
    .withMessage('Email filter must not exceed 255 characters')
    .trim(),
  query('id_number')
    .optional()
    .isLength({ max: 100 })
    .withMessage('ID number filter must not exceed 100 characters')
    .trim(),
  query('position_applied_for')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Position applied for filter must not exceed 255 characters')
    .trim(),
  query('expected_salary')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Expected salary filter must not exceed 100 characters')
    .trim(),
  query('emergency_contact')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Emergency contact filter must not exceed 50 characters')
    .trim(),
  query('present_address')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Present address filter must not exceed 1000 characters')
    .trim(),
  query('city')
    .optional()
    .isLength({ max: 100 })
    .withMessage('City filter must not exceed 100 characters')
    .trim(),
  query('date_of_birth')
    .optional()
    .custom(validateDate)
    .withMessage('Invalid date of birth filter format'),
  query('blood_type')
    .optional()
    .isLength({ max: 10 })
    .withMessage('Blood type filter must not exceed 10 characters')
    .trim(),
  query('tax_identification_number')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Tax identification number filter must not exceed 100 characters')
    .trim(),
  query('working_available_date')
    .optional()
    .custom(validateDate)
    .withMessage('Invalid working available date filter format'),
  query('religion')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Religion filter must not exceed 100 characters')
    .trim(),
];

// Validation for list applicants (POST method)
const validateListApplicantsPost = [
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
    .isIn(['first_name', 'last_name', 'email', 'mobile', 'position_applied_for', 'create_at', 'update_at'])
    .withMessage('Invalid sort field'),
  body('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  body('applicate_id')
    .optional()
    .custom(validateUUID)
    .withMessage('Invalid applicant ID format'),
  body('first_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('First name filter must not exceed 255 characters')
    .trim(),
  body('middle_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Middle name filter must not exceed 255 characters')
    .trim(),
  body('last_name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Last name filter must not exceed 255 characters')
    .trim(),
  body('mobile')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Mobile filter must not exceed 50 characters')
    .trim(),
  body('email')
    .optional()
    .custom(validateEmail)
    .isLength({ max: 255 })
    .withMessage('Email filter must not exceed 255 characters')
    .trim(),
  body('id_number')
    .optional()
    .isLength({ max: 100 })
    .withMessage('ID number filter must not exceed 100 characters')
    .trim(),
  body('position_applied_for')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Position applied for filter must not exceed 255 characters')
    .trim(),
  body('expected_salary')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Expected salary filter must not exceed 100 characters')
    .trim(),
  body('emergency_contact')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Emergency contact filter must not exceed 50 characters')
    .trim(),
  body('present_address')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Present address filter must not exceed 1000 characters')
    .trim(),
  body('city')
    .optional()
    .isLength({ max: 100 })
    .withMessage('City filter must not exceed 100 characters')
    .trim(),
  body('date_of_birth')
    .optional()
    .custom(validateDate)
    .withMessage('Invalid date of birth filter format'),
  body('blood_type')
    .optional()
    .isLength({ max: 10 })
    .withMessage('Blood type filter must not exceed 10 characters')
    .trim(),
  body('tax_identification_number')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Tax identification number filter must not exceed 100 characters')
    .trim(),
  body('working_available_date')
    .optional()
    .custom(validateDate)
    .withMessage('Invalid working available date filter format'),
  body('religion')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Religion filter must not exceed 100 characters')
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
  validateCreateApplicant,
  validateUpdateApplicant,
  validateGetApplicant,
  validateDeleteApplicant,
  validateListApplicants,
  validateListApplicantsPost,
  handleValidationErrors
};
