const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class GendersRepository {
  async findById(id) {
    const gender = await db('genders')
      .where('gender_id', id)
      .where('is_delete', false)
      .first();
    return gender;
  }

  /**
   * Find genders dengan filter standar (pagination, sorting, searching, filtering)
   * @param {Object} queryParams - Parsed query parameters dari parseStandardQuery
   * @returns {Object} Paginated response dengan data dan metadata
   */
  async findWithFilters(queryParams) {
    // Base query untuk data
    const baseQuery = db('genders')
      .select('*')
      .where('is_delete', false);

    // Query untuk count total records - buat query terpisah tanpa select *
    const countBaseQuery = db('genders')
      .where('is_delete', false);
    const countQuery = buildCountQuery(countBaseQuery, queryParams);
    const [{ count }] = await countQuery.count('gender_id as count');
    const total = parseInt(count);

    // Apply filters dan pagination ke base query
    const dataQuery = applyStandardFilters(baseQuery.clone(), queryParams);
    const data = await dataQuery;

    // Format response dengan pagination metadata
    return formatPaginatedResponse(data, queryParams.pagination, total);
  }

  /**
   * Find genders dengan filter sederhana (tanpa pagination)
   * @param {Object} filters - Filter parameters
   * @returns {Array} Array of genders
   */
  async findWithSimpleFilters(filters = {}) {
    let query = db('genders')
      .select('*')
      .where('is_delete', false);

    // Apply search
    if (filters.search) {
      query = query.where(function() {
        this.where('gender_name', 'ilike', `%${filters.search}%`);
      });
    }

    // Apply sorting
    if (filters.sort_by) {
      const sortOrder = filters.sort_order || 'asc';
      query = query.orderBy(filters.sort_by, sortOrder);
    } else {
      query = query.orderBy('created_at', 'desc');
    }

    return query;
  }
}

module.exports = new GendersRepository();
