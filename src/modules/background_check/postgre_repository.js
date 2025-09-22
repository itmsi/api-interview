const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class BackgroundCheckRepository {
  async create(data) {
    const [backgroundCheck] = await db('background_check')
      .insert(data)
      .returning('*');
    return backgroundCheck;
  }

  async findById(id) {
    const backgroundCheck = await db('background_check')
      .where('background_check_id', id)
      .whereNull('delete_at')
      .first();
    return backgroundCheck;
  }

  async findByIdWithRelations(id) {
    const backgroundCheck = await db('background_check')
      .leftJoin('candidates', 'background_check.candidate_id', 'candidates.candidate_id')
      .where('background_check.background_check_id', id)
      .whereNull('background_check.delete_at')
      .select(
        'background_check.*',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'candidates.candidate_phone'
      )
      .first();
    return backgroundCheck;
  }

  async update(id, data) {
    const [backgroundCheck] = await db('background_check')
      .where('background_check_id', id)
      .whereNull('delete_at')
      .update({
        ...data,
        update_at: db.fn.now()
      })
      .returning('*');
    return backgroundCheck;
  }

  async softDelete(id, deletedBy) {
    const [backgroundCheck] = await db('background_check')
      .where('background_check_id', id)
      .whereNull('delete_at')
      .update({
        delete_at: db.fn.now(),
        delete_by: deletedBy
      })
      .returning('*');
    return backgroundCheck;
  }

  async restore(id, updatedBy) {
    const [backgroundCheck] = await db('background_check')
      .where('background_check_id', id)
      .whereNotNull('delete_at')
      .update({
        delete_at: null,
        delete_by: null,
        update_at: db.fn.now(),
        update_by: updatedBy
      })
      .returning('*');
    return backgroundCheck;
  }

  /**
   * Find background checks dengan filter standar (pagination, sorting, searching, filtering)
   * @param {Object} queryParams - Parsed query parameters dari parseStandardQuery
   * @returns {Object} Paginated response dengan data dan metadata
   */
  async findWithFilters(queryParams) {
    // Base query untuk data
    const baseQuery = db('background_check')
      .leftJoin('candidates', 'background_check.candidate_id', 'candidates.candidate_id')
      .select(
        'background_check.*',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'candidates.candidate_phone'
      )
      .whereNull('background_check.delete_at');

    // Query untuk count total records - buat query terpisah tanpa select
    const countBaseQuery = db('background_check')
      .leftJoin('candidates', 'background_check.candidate_id', 'candidates.candidate_id')
      .whereNull('background_check.delete_at');
    const countQuery = buildCountQuery(countBaseQuery, queryParams);
    const [{ count }] = await countQuery.count('background_check.background_check_id as count');
    const total = parseInt(count);

    // Apply filters dan pagination ke base query
    const dataQuery = applyStandardFilters(baseQuery.clone(), queryParams);
    const data = await dataQuery;

    // Format response dengan pagination metadata
    return formatPaginatedResponse(data, queryParams.pagination, total);
  }

  /**
   * Find background checks dengan filter sederhana (tanpa pagination)
   * @param {Object} filters - Filter parameters
   * @returns {Array} Array of background checks
   */
  async findWithSimpleFilters(filters = {}) {
    let query = db('background_check')
      .leftJoin('candidates', 'background_check.candidate_id', 'candidates.candidate_id')
      .select(
        'background_check.*',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'candidates.candidate_phone'
      )
      .whereNull('background_check.delete_at');

    // Apply search
    if (filters.search) {
      query = query.where(function() {
        this.where('background_check.background_check_note', 'ilike', `%${filters.search}%`)
          .orWhere('background_check.background_check_status', 'ilike', `%${filters.search}%`)
          .orWhere('candidates.candidate_name', 'ilike', `%${filters.search}%`)
          .orWhere('candidates.candidate_email', 'ilike', `%${filters.search}%`);
      });
    }

    // Apply sorting
    if (filters.sort_by) {
      const sortOrder = filters.sort_order || 'asc';
      query = query.orderBy(`background_check.${filters.sort_by}`, sortOrder);
    } else {
      query = query.orderBy('background_check.create_at', 'desc');
    }

    return query;
  }

  async count(filters = {}) {
    let query = db('background_check')
      .whereNull('delete_at');

    // Apply filters
    if (filters.search) {
      query = query.where(function() {
        this.where('background_check_note', 'ilike', `%${filters.search}%`)
          .orWhere('background_check_status', 'ilike', `%${filters.search}%`);
      });
    }

    const result = await query.count('background_check_id as count').first();
    return parseInt(result.count);
  }

  /**
   * Find background checks by candidate ID
   * @param {string} candidateId - Candidate ID
   * @returns {Array} Array of background checks for the candidate
   */
  async findByCandidateId(candidateId) {
    const backgroundChecks = await db('background_check')
      .leftJoin('candidates', 'background_check.candidate_id', 'candidates.candidate_id')
      .select(
        'background_check.*',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'candidates.candidate_phone'
      )
      .where('background_check.candidate_id', candidateId)
      .whereNull('background_check.delete_at')
      .orderBy('background_check.create_at', 'desc');
    return backgroundChecks;
  }
}

module.exports = new BackgroundCheckRepository();
