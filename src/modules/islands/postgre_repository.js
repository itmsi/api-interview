const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class IslandsRepository {
  async findById(id) {
    const island = await db('islands')
      .where('island_id', id)
      .where('is_delete', false)
      .first();
    return island;
  }

  /**
   * Find islands dengan filter standar (pagination, sorting, searching, filtering)
   * @param {Object} queryParams - Parsed query parameters dari parseStandardQuery
   * @returns {Object} Paginated response dengan data dan metadata
   */
  async findWithFilters(queryParams) {
    // Base query untuk data
    const baseQuery = db('islands')
      .select('*')
      .where('is_delete', false);

    // Query untuk count total records
    const countQuery = buildCountQuery(baseQuery, queryParams);
    const [{ total }] = await countQuery;

    // Apply filters dan pagination ke base query
    const dataQuery = applyStandardFilters(baseQuery.clone(), queryParams);
    const data = await dataQuery;

    // Format response dengan pagination metadata
    return formatPaginatedResponse(data, queryParams.pagination, total);
  }

  /**
   * Find islands dengan filter sederhana (tanpa pagination)
   * @param {Object} filters - Filter parameters
   * @returns {Array} Array of islands
   */
  async findWithSimpleFilters(filters = {}) {
    let query = db('islands')
      .select('*')
      .where('is_delete', false);

    // Apply search
    if (filters.search) {
      query = query.where(function() {
        this.where('island_name', 'ilike', `%${filters.search}%`);
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

module.exports = new IslandsRepository();
