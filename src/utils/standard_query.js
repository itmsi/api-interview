/**
 * Standard Query Utilities
 * Utility functions untuk parsing query parameters yang terstandarisasi
 * untuk semua module dalam sistem Report Management
 */

const { PAGE, LIMIT } = require('./constant');

/**
 * Parse query parameters untuk pagination
 * @param {Object} req - Express request object
 * @param {Boolean} fromBody - Whether to parse from body instead of query
 * @returns {Object} Pagination parameters
 */
const parsePagination = (req, fromBody = false) => {
  const source = fromBody ? req.body : req.query;
  const page = parseInt(source.page) || PAGE;
  const limit = parseInt(source.limit) || LIMIT;
  
  // Validasi limit maksimal
  const maxLimit = 100;
  const validLimit = Math.min(limit, maxLimit);
  
  return {
    page: Math.max(1, page),
    limit: Math.max(1, validLimit),
    offset: (Math.max(1, page) - 1) * Math.max(1, validLimit)
  };
};

/**
 * Parse query parameters untuk sorting
 * @param {Object} req - Express request object
 * @param {Array} allowedColumns - Array kolom yang diizinkan untuk sorting
 * @param {Array} defaultOrder - Default order [column, direction]
 * @param {Boolean} fromBody - Whether to parse from body instead of query
 * @returns {Object} Sorting parameters
 */
const parseSorting = (req, allowedColumns = [], defaultOrder = ['created_at', 'desc'], fromBody = false) => {
  const source = fromBody ? req.body : req.query;
  const sortBy = source.sort_by || defaultOrder[0];
  const sortOrder = source.sort_order || defaultOrder[1];
  
  // Validasi kolom yang diizinkan
  const validColumn = allowedColumns.length > 0 && allowedColumns.includes(sortBy) 
    ? sortBy 
    : (defaultOrder[0] || 'created_at');
  
  // Validasi order direction
  const validOrder = ['asc', 'desc'].includes(sortOrder.toLowerCase()) 
    ? sortOrder.toLowerCase() 
    : (defaultOrder[1] || 'desc');
  
  return {
    sortBy: validColumn,
    sortOrder: validOrder,
  };
};

/**
 * Parse query parameters untuk searching
 * @param {Object} req - Express request object
 * @param {Array} searchableColumns - Array kolom yang bisa di-search
 * @param {Boolean} fromBody - Whether to parse from body instead of query
 * @returns {Object} Search parameters
 */
const parseSearch = (req, searchableColumns = [], fromBody = false) => {
  const source = fromBody ? req.body : req.query;
  const searchTerm = source.search || source.q || '';
  
  return {
    searchTerm: searchTerm.trim(),
    searchableColumns,
  };
};

/**
 * Parse query parameters untuk filtering
 * @param {Object} req - Express request object
 * @param {Array} allowedFilters - Array kolom yang diizinkan untuk filter
 * @param {Boolean} fromBody - Whether to parse from body instead of query
 * @returns {Object} Filter parameters
 */
const parseFilters = (req, allowedFilters = [], fromBody = false) => {
  const source = fromBody ? req.body : req.query;
  const filters = {};
  
  if (allowedFilters.length === 0) {
    return filters;
  }
  
  allowedFilters.forEach(filterKey => {
    if (source[filterKey] !== undefined && source[filterKey] !== '') {
      filters[filterKey] = source[filterKey];
    }
  });
  
  return filters;
};

/**
 * Parse semua query parameters sekaligus
 * @param {Object} req - Express request object
 * @param {Object} options - Konfigurasi parsing
 * @returns {Object} Parsed query parameters
 */
const parseStandardQuery = (req, options = {}) => {
  const {
    allowedColumns = [],
    defaultOrder = ['created_at', 'desc'],
    searchableColumns = [],
    allowedFilters = [],
    fromBody = false
  } = options;
  
  const pagination = parsePagination(req, fromBody);
  const sorting = parseSorting(req, allowedColumns, defaultOrder, fromBody);
  const search = parseSearch(req, searchableColumns, fromBody);
  const filters = parseFilters(req, allowedFilters, fromBody);
  
  return {
    pagination,
    sorting,
    search,
    filters,
    // Legacy compatibility
    page: pagination.page,
    limit: pagination.limit,
    offset: pagination.offset,
    sort_by: sorting.sortBy,
    sort_order: sorting.sortOrder,
    search: search.searchTerm
  };
};

/**
 * Build query untuk count total records
 * @param {Object} baseQuery - Base Knex query
 * @param {Object} queryParams - Parsed query parameters
 * @returns {Object} Count query
 */
const buildCountQuery = (baseQuery, queryParams) => {
  let countQuery = baseQuery.clone();
  
  // Apply search
  if (queryParams.search.searchTerm && queryParams.search.searchableColumns.length > 0) {
    countQuery = countQuery.where(function() {
      queryParams.search.searchableColumns.forEach((column, index) => {
        // Handle ambiguous column references
        let columnName = column;
        if (column === 'on_board_documents_name') {
          columnName = 'on_board_documents.on_board_documents_name';
        } else if (column === 'candidate_name') {
          columnName = 'candidates.candidate_name';
        } else if (column === 'candidate_email') {
          columnName = 'candidates.candidate_email';
        } else if (column === 'company_name') {
          columnName = 'companies.company_name';
        } else if (column === 'department_name') {
          columnName = 'departments.department_name';
        }
        
        if (index === 0) {
          this.where(columnName, 'ilike', `%${queryParams.search.searchTerm}%`);
        } else {
          this.orWhere(columnName, 'ilike', `%${queryParams.search.searchTerm}%`);
        }
      });
    });
  }
  
  // Apply filters
  Object.keys(queryParams.filters).forEach(filterKey => {
    const filterValue = queryParams.filters[filterKey];
    if (filterValue !== undefined && filterValue !== '') {
      // Handle ambiguous column references
      let columnName = filterKey;
      if (filterKey === 'candidate_id') {
        // Check if we're dealing with background_check or on_board_documents
        if (countQuery.toString().includes('background_check')) {
          columnName = 'background_check.candidate_id';
        } else {
          columnName = 'on_board_documents.candidate_id';
        }
      } else if (filterKey === 'company_id') {
        columnName = 'candidates.company_id';
      } else if (filterKey === 'departement_id') {
        columnName = 'candidates.departement_id';
      } else if (filterKey === 'title_id') {
        columnName = 'candidates.title_id';
      }
      countQuery = countQuery.where(columnName, filterValue);
    }
  });
  
  return countQuery;
};

/**
 * Apply standard filters ke query
 * @param {Object} baseQuery - Base Knex query
 * @param {Object} queryParams - Parsed query parameters
 * @returns {Object} Filtered query
 */
const applyStandardFilters = (baseQuery, queryParams) => {
  let query = baseQuery;
  
  // Apply search
  if (queryParams.search.searchTerm && queryParams.search.searchableColumns.length > 0) {
    query = query.where(function() {
      queryParams.search.searchableColumns.forEach((column, index) => {
        // Handle ambiguous column references
        let columnName = column;
        if (column === 'on_board_documents_name') {
          columnName = 'on_board_documents.on_board_documents_name';
        } else if (column === 'candidate_name') {
          columnName = 'candidates.candidate_name';
        } else if (column === 'candidate_email') {
          columnName = 'candidates.candidate_email';
        } else if (column === 'company_name') {
          columnName = 'companies.company_name';
        } else if (column === 'department_name') {
          columnName = 'departments.department_name';
        }
        
        if (index === 0) {
          this.where(columnName, 'ilike', `%${queryParams.search.searchTerm}%`);
        } else {
          this.orWhere(columnName, 'ilike', `%${queryParams.search.searchTerm}%`);
        }
      });
    });
  }
  
  // Apply filters
  Object.keys(queryParams.filters).forEach(filterKey => {
    const filterValue = queryParams.filters[filterKey];
    if (filterValue !== undefined && filterValue !== '') {
      // Handle ambiguous column references
      let columnName = filterKey;
      if (filterKey === 'candidate_id') {
        // Check if we're dealing with background_check or on_board_documents
        if (query.toString().includes('background_check')) {
          columnName = 'background_check.candidate_id';
        } else {
          columnName = 'on_board_documents.candidate_id';
        }
      } else if (filterKey === 'company_id') {
        columnName = 'candidates.company_id';
      } else if (filterKey === 'departement_id') {
        columnName = 'candidates.departement_id';
      } else if (filterKey === 'title_id') {
        columnName = 'candidates.title_id';
      }
      query = query.where(columnName, filterValue);
    }
  });
  
  // Apply sorting
  let sortColumn = queryParams.sorting.sortBy;
  if (sortColumn === 'create_at' || sortColumn === 'update_at') {
    // Check if we're dealing with background_check or on_board_documents
    if (query.toString().includes('background_check')) {
      sortColumn = `background_check.${sortColumn}`;
    } else {
      sortColumn = `on_board_documents.${sortColumn}`;
    }
  } else if (sortColumn === 'on_board_documents_name') {
    sortColumn = `on_board_documents.${sortColumn}`;
  } else if (sortColumn === 'background_check_status') {
    sortColumn = `background_check.${sortColumn}`;
  }
  query = query.orderBy(sortColumn, queryParams.sorting.sortOrder);
  
  // Apply pagination
  query = query.limit(queryParams.pagination.limit).offset(queryParams.pagination.offset);
  
  return query;
};

/**
 * Format response dengan pagination metadata
 * @param {Array} data - Data array
 * @param {Object} pagination - Pagination parameters
 * @param {Number} total - Total records
 * @returns {Object} Formatted response
 */
const formatPaginatedResponse = (data, pagination, total) => {
  const totalPages = Math.ceil(total / pagination.limit);
  const hasNextPage = pagination.page < totalPages;
  const hasPrevPage = pagination.page > 1;
  
  return {
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? pagination.page + 1 : null,
      prevPage: hasPrevPage ? pagination.page - 1 : null
    }
  };
};

/**
 * Standard error response untuk query parsing
 * @param {Object} res - Express response object
 * @param {String} message - Error message
 * @param {Number} statusCode - HTTP status code
 * @returns {Object} Error response
 */
const sendQueryError = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null
  });
};

/**
 * Standard success response untuk query results
 * @param {Object} res - Express response object
 * @param {Object} result - Query result dengan pagination
 * @param {String} message - Success message
 * @returns {Object} Success response
 */
const sendQuerySuccess = (res, result, message) => {
  return res.json({
    success: true,
    message,
    ...result
  });
};

module.exports = {
  parsePagination,
  parseSorting,
  parseSearch,
  parseFilters,
  parseStandardQuery,
  buildCountQuery,
  applyStandardFilters,
  formatPaginatedResponse,
  sendQueryError,
  sendQuerySuccess
};
