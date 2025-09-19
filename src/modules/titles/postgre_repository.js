const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class TitlesRepository {
  async findById(id) {
    const title = await db('titles')
      .where('title_id', id)
      .where('is_delete', false)
      .first();
    return title;
  }

  async findByIdWithDepartment(id) {
    const title = await db('titles')
      .leftJoin('departments', 'titles.department_id', 'departments.department_id')
      .leftJoin('companies', 'departments.company_id', 'companies.company_id')
      .where('titles.title_id', id)
      .where('titles.is_delete', false)
      .select(
        'titles.*',
        'departments.department_name',
        'departments.department_segmentasi',
        'companies.company_name'
      )
      .first();
    return title;
  }

  /**
   * Find titles dengan filter standar (pagination, sorting, searching, filtering)
   * @param {Object} queryParams - Parsed query parameters dari parseStandardQuery
   * @returns {Object} Paginated response dengan data dan metadata
   */
  async findWithFilters(queryParams) {
    // Base query untuk data
    const baseQuery = db('titles')
      .leftJoin('departments', 'titles.department_id', 'departments.department_id')
      .leftJoin('companies', 'departments.company_id', 'companies.company_id')
      .select(
        'titles.*',
        'departments.department_name',
        'companies.company_name'
      )
      .where('titles.is_delete', false);

    // Query untuk count total records - buat query terpisah tanpa select
    const countBaseQuery = db('titles')
      .leftJoin('departments', 'titles.department_id', 'departments.department_id')
      .leftJoin('companies', 'departments.company_id', 'companies.company_id')
      .where('titles.is_delete', false);
    const countQuery = buildCountQuery(countBaseQuery, queryParams);
    const [{ count }] = await countQuery.count('titles.title_id as count');
    const total = parseInt(count);

    // Apply filters dan pagination ke base query
    const dataQuery = applyStandardFilters(baseQuery.clone(), queryParams);
    const data = await dataQuery;

    // Format response dengan pagination metadata
    return formatPaginatedResponse(data, queryParams.pagination, total);
  }

  /**
   * Find titles dengan filter sederhana (tanpa pagination)
   * @param {Object} filters - Filter parameters
   * @returns {Array} Array of titles
   */
  async findWithSimpleFilters(filters = {}) {
    let query = db('titles')
      .leftJoin('departments', 'titles.department_id', 'departments.department_id')
      .leftJoin('companies', 'departments.company_id', 'companies.company_id')
      .select(
        'titles.*',
        'departments.department_name',
        'companies.company_name'
      )
      .where('titles.is_delete', false);

    // Apply search
    if (filters.search) {
      query = query.where(function() {
        this.where('titles.title_name', 'ilike', `%${filters.search}%`);
      });
    }

    // Apply sorting
    if (filters.sort_by) {
      const sortOrder = filters.sort_order || 'asc';
      query = query.orderBy(`titles.${filters.sort_by}`, sortOrder);
    } else {
      query = query.orderBy('titles.created_at', 'desc');
    }

    return query;
  }
}

module.exports = new TitlesRepository();
