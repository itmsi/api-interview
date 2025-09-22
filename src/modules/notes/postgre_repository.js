const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class NotesRepository {
  async create(data) {
    const [note] = await db('notes')
      .insert(data)
      .returning('*');
    return note;
  }

  async findById(id) {
    const note = await db('notes')
      .where('note_id', id)
      .where('is_delete', false)
      .first();
    return note;
  }

  async findByIdWithRelations(id) {
    const note = await db('notes')
      .leftJoin('candidates', 'notes.candidate_id', 'candidates.candidate_id')
      .leftJoin('employees', 'notes.employee_id', 'employees.employee_id')
      .where('notes.note_id', id)
      .where('notes.is_delete', false)
      .select(
        'notes.*',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'employees.employee_name',
        'employees.employee_email'
      )
      .first();
    return note;
  }

  async update(id, data) {
    const [note] = await db('notes')
      .where('note_id', id)
      .where('is_delete', false)
      .update({
        ...data,
        update_at: db.fn.now()
      })
      .returning('*');
    return note;
  }

  async softDelete(id, deletedBy) {
    const [note] = await db('notes')
      .where('note_id', id)
      .where('is_delete', false)
      .update({
        is_delete: true,
        delete_at: db.fn.now(),
        delete_by: deletedBy
      })
      .returning('*');
    return note;
  }

  async restore(id, updatedBy) {
    const [note] = await db('notes')
      .where('note_id', id)
      .where('is_delete', true)
      .update({
        is_delete: false,
        delete_at: null,
        delete_by: null,
        update_at: db.fn.now(),
        update_by: updatedBy
      })
      .returning('*');
    return note;
  }

  /**
   * Find notes dengan filter standar (pagination, sorting, searching, filtering)
   * @param {Object} queryParams - Parsed query parameters dari parseStandardQuery
   * @returns {Object} Paginated response dengan data dan metadata
   */
  async findWithFilters(queryParams) {
    // Base query untuk data
    const baseQuery = db('notes')
      .leftJoin('candidates', 'notes.candidate_id', 'candidates.candidate_id')
      .leftJoin('employees', 'notes.employee_id', 'employees.employee_id')
      .select(
        'notes.*',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'employees.employee_name',
        'employees.employee_email'
      )
      .where('notes.is_delete', false);

    // Query untuk count total records - buat query terpisah tanpa select
    let countQuery = db('notes')
      .leftJoin('candidates', 'notes.candidate_id', 'candidates.candidate_id')
      .leftJoin('employees', 'notes.employee_id', 'employees.employee_id')
      .where('notes.is_delete', false);
    
    // Apply search to count query
    if (queryParams.search.searchTerm && queryParams.search.searchableColumns.length > 0) {
      countQuery = countQuery.where(function() {
        queryParams.search.searchableColumns.forEach((column, index) => {
          if (index === 0) {
            this.where(`notes.${column}`, 'ilike', `%${queryParams.search.searchTerm}%`);
          } else {
            this.orWhere(`notes.${column}`, 'ilike', `%${queryParams.search.searchTerm}%`);
          }
        });
      });
    }
    
    // Apply filters to count query
    Object.keys(queryParams.filters).forEach(filterKey => {
      const filterValue = queryParams.filters[filterKey];
      if (filterValue !== undefined && filterValue !== '') {
        countQuery = countQuery.where(`notes.${filterKey}`, filterValue);
      }
    });
    
    const [{ count }] = await countQuery.count('notes.note_id as count');
    const total = parseInt(count);

    // Apply filters dan pagination ke base query
    let dataQuery = baseQuery.clone();
    
    // Apply search
    if (queryParams.search.searchTerm && queryParams.search.searchableColumns.length > 0) {
      dataQuery = dataQuery.where(function() {
        queryParams.search.searchableColumns.forEach((column, index) => {
          if (index === 0) {
            this.where(`notes.${column}`, 'ilike', `%${queryParams.search.searchTerm}%`);
          } else {
            this.orWhere(`notes.${column}`, 'ilike', `%${queryParams.search.searchTerm}%`);
          }
        });
      });
    }
    
    // Apply filters manually
    Object.keys(queryParams.filters).forEach(filterKey => {
      const filterValue = queryParams.filters[filterKey];
      if (filterValue !== undefined && filterValue !== '') {
        dataQuery = dataQuery.where(`notes.${filterKey}`, filterValue);
      }
    });
    
    // Apply sorting
    if (queryParams.sorting.sortBy) {
      dataQuery = dataQuery.orderBy(`notes.${queryParams.sorting.sortBy}`, queryParams.sorting.sortOrder);
    }
    
    // Apply pagination
    dataQuery = dataQuery
      .limit(queryParams.pagination.limit)
      .offset(queryParams.pagination.offset);
    
    const data = await dataQuery;

    // Format response dengan pagination metadata
    return formatPaginatedResponse(data, queryParams.pagination, total);
  }

  /**
   * Find notes dengan filter sederhana (tanpa pagination)
   * @param {Object} filters - Filter parameters
   * @returns {Array} Array of notes
   */
  async findWithSimpleFilters(filters = {}) {
    let query = db('notes')
      .leftJoin('candidates', 'notes.candidate_id', 'candidates.candidate_id')
      .leftJoin('employees', 'notes.employee_id', 'employees.employee_id')
      .select(
        'notes.*',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'employees.employee_name',
        'employees.employee_email'
      )
      .where('notes.is_delete', false);

    // Apply search
    if (filters.search) {
      query = query.where(function() {
        this.where('notes.notes', 'ilike', `%${filters.search}%`)
          .orWhere('candidates.candidate_name', 'ilike', `%${filters.search}%`)
          .orWhere('candidates.candidate_email', 'ilike', `%${filters.search}%`)
          .orWhere('employees.employee_name', 'ilike', `%${filters.search}%`)
          .orWhere('employees.employee_email', 'ilike', `%${filters.search}%`);
      });
    }

    // Apply candidate_id filter
    if (filters.candidate_id) {
      query = query.where('notes.candidate_id', filters.candidate_id);
    }

    // Apply employee_id filter
    if (filters.employee_id) {
      query = query.where('notes.employee_id', filters.employee_id);
    }

    // Apply sorting
    if (filters.sort_by) {
      const sortOrder = filters.sort_order || 'asc';
      query = query.orderBy(`notes.${filters.sort_by}`, sortOrder);
    } else {
      query = query.orderBy('notes.create_at', 'desc');
    }

    return query;
  }

  async count(filters = {}) {
    let query = db('notes')
      .where('is_delete', false);

    // Apply filters
    if (filters.search) {
      query = query.where(function() {
        this.where('notes', 'ilike', `%${filters.search}%`);
      });
    }

    if (filters.candidate_id) {
      query = query.where('candidate_id', filters.candidate_id);
    }

    if (filters.employee_id) {
      query = query.where('employee_id', filters.employee_id);
    }

    const result = await query.count('note_id as count').first();
    return parseInt(result.count);
  }
}

module.exports = new NotesRepository();
