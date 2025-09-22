const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter function for PowerBI reports
const fileFilter = (req, file, cb) => {
  // Allow specific file types for PowerBI reports
  const allowedTypes = [
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/pdf', // .pdf
    'text/csv', // .csv
    'application/json', // .json
    'application/xml', // .xml
    'text/xml', // .xml
    'application/zip', // .zip
    'application/x-zip-compressed', // .zip
    'application/octet-stream' // .pbix and other binary files
  ];

  // Check file extension as fallback
  const allowedExtensions = ['.xls', '.xlsx', '.pdf', '.csv', '.json', '.xml', '.zip', '.pbix'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error(`File type not allowed. Allowed types: ${allowedExtensions.join(', ')}`), false);
  }
};

// File filter function for candidates (photos and resumes)
const candidateFileFilter = (req, file, cb) => {
  // Allow specific file types for candidate uploads
  const allowedTypes = [
    // Images
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    // Documents
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'text/plain' // .txt
  ];

  // Check file extension as fallback
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.doc', '.docx', '.txt'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  // Different validation based on field name
  if (file.fieldname === 'candidate_foto') {
    const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    
    if (imageTypes.includes(file.mimetype) || imageExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error(`Photo file type not allowed. Allowed types: ${imageExtensions.join(', ')}`), false);
    }
  } else if (file.fieldname === 'candidate_resume') {
    const documentTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    const documentExtensions = ['.pdf', '.doc', '.docx', '.txt'];
    
    if (documentTypes.includes(file.mimetype) || documentExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error(`Resume file type not allowed. Allowed types: ${documentExtensions.join(', ')}`), false);
    }
  } else {
    // For other files, use general validation
    if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error(`File type not allowed. Allowed types: ${allowedExtensions.join(', ')}`), false);
    }
  }
};

// File filter function for background check attachments
const backgroundCheckFileFilter = (req, file, cb) => {
  // Allow specific file types for background check attachments
  const allowedTypes = [
    // Images
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    // Documents
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'text/plain', // .txt
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // .xlsx
  ];

  // Check file extension as fallback
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error(`Background check file type not allowed. Allowed types: ${allowedExtensions.join(', ')}`), false);
  }
};

// File filter function for on board documents
const onBoardDocumentFileFilter = (req, file, cb) => {
  // Allow all file types for on board documents
  const allowedTypes = [
    // Images
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/tiff',
    'image/svg+xml',
    // Documents
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-powerpoint', // .ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
    'text/plain', // .txt
    'text/csv', // .csv
    'application/rtf', // .rtf
    // Archives
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
    'application/gzip',
    // Other common types
    'application/json',
    'application/xml',
    'text/xml',
    'application/octet-stream' // Generic binary
  ];

  // Check file extension as fallback
  const allowedExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.svg',
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.csv', '.rtf',
    '.zip', '.rar', '.7z', '.gz',
    '.json', '.xml'
  ];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  // Allow all files - remove strict validation for on board documents
  console.log('DEBUG: On board document file upload - mimetype:', file.mimetype, 'extension:', fileExtension);
  cb(null, true);
};

// Configure multer for PowerBI
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 1 // Only one file per request
  }
});

// Configure multer for candidates with multiple files
const candidateUpload = multer({
  storage: storage,
  fileFilter: candidateFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 2 // Allow up to 2 files (photo and resume)
  }
});

// Configure multer for background check attachments
const backgroundCheckUpload = multer({
  storage: storage,
  fileFilter: backgroundCheckFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 1 // Only one file per request
  }
});

// Configure multer for on board document attachments
const onBoardDocumentUpload = multer({
  storage: storage,
  fileFilter: onBoardDocumentFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit per file
    files: 1 // Only one file per request
  }
});

// Middleware for single file upload (PowerBI)
const uploadSingleFile = upload.single('file');

// Middleware for candidate files upload
const uploadCandidateFiles = candidateUpload.fields([
  { name: 'candidate_foto', maxCount: 1 },
  { name: 'candidate_resume', maxCount: 1 }
]);

// Middleware for background check file upload
const uploadBackgroundCheckFile = backgroundCheckUpload.single('file_attachment');

// Middleware for on board document file upload
const uploadOnBoardDocumentFile = onBoardDocumentUpload.single('on_board_documents_file');

// Middleware wrapper to handle multer errors for single file (PowerBI)
const handleFileUpload = (req, res, next) => {
  uploadSingleFile(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum size is 50MB.',
          error: err.message
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Only one file is allowed.',
          error: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: 'File upload error',
        error: err.message
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: 'File validation error',
        error: err.message
      });
    }
    console.log('DEBUG: Files processed successfully in handleFileUpload, req.file:', req.file);
    next();
  });
};

// Middleware wrapper to handle multer errors for candidate files
const handleCandidateFileUpload = (req, res, next) => {
  console.log('DEBUG: handleCandidateFileUpload called');
  console.log('DEBUG: req.body before upload:', req.body);
  uploadCandidateFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum size is 10MB per file.',
          error: err.message
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Maximum 2 files allowed (photo and resume).',
          error: err.message
        });
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
          success: false,
          message: 'Unexpected file field. Only candidate_foto and candidate_resume are allowed.',
          error: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: 'File upload error',
        error: err.message
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: 'File validation error',
        error: err.message
      });
    }
    console.log('DEBUG: Files processed successfully in handleCandidateFileUpload, req.files:', req.files);
    next();
  });
};

// Middleware wrapper to handle multer errors for background check files
const handleBackgroundCheckFileUpload = (req, res, next) => {
  console.log('DEBUG: handleBackgroundCheckFileUpload called');
  console.log('DEBUG: req.body before upload:', req.body);
  uploadBackgroundCheckFile(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum size is 10MB.',
          error: err.message
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Only one file is allowed.',
          error: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: 'File upload error',
        error: err.message
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: 'File validation error',
        error: err.message
      });
    }
    console.log('DEBUG: Files processed successfully in handleBackgroundCheckFileUpload, req.file:', req.file);
    next();
  });
};

// Middleware wrapper to handle multer errors for on board document files
const handleOnBoardDocumentFileUpload = (req, res, next) => {
  console.log('DEBUG: handleOnBoardDocumentFileUpload called');
  console.log('DEBUG: req.body before upload:', req.body);
  uploadOnBoardDocumentFile(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum size is 50MB.',
          error: err.message
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Only one file is allowed.',
          error: err.message
        });
      }
      return res.status(400).json({
        success: false,
        message: 'File upload error',
        error: err.message
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: 'File validation error',
        error: err.message
      });
    }
    console.log('DEBUG: Files processed successfully in handleOnBoardDocumentFileUpload, req.file:', req.file);
    next();
  });
};

// Generate unique filename
const generateFileName = (originalName) => {
  const timestamp = Date.now();
  const uuid = uuidv4();
  const extension = path.extname(originalName);
  const baseName = path.basename(originalName, extension);
  
  // Sanitize filename
  const sanitizedName = baseName.replace(/[^a-zA-Z0-9-_]/g, '_');
  
  return `powerbi/${timestamp}_${uuid}_${sanitizedName}${extension}`;
};

// Get content type based on file extension
const getContentType = (filename) => {
  const extension = path.extname(filename).toLowerCase();
  const contentTypes = {
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.pdf': 'application/pdf',
    '.csv': 'text/csv',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.zip': 'application/zip',
    '.pbix': 'application/octet-stream'
  };
  
  return contentTypes[extension] || 'application/octet-stream';
};

module.exports = {
  handleFileUpload,
  handleCandidateFileUpload,
  handleBackgroundCheckFileUpload,
  handleOnBoardDocumentFileUpload,
  generateFileName,
  getContentType
};
