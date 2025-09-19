const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class CompaniesRepository {
  async findById(id) {
    const company = await db('companies')
      .where('company_id', id)
      .where('is_delete', false)
      .first();
    return company;
  }

  async findAll(filters = {}) {
    let query = db('companies')
      .where('is_delete', false);

    // Apply filters
    if (filters.search) {
      query = query.where(function() {
        this.where('company_name', 'ilike', `%${filters.search}%`)
          .orWhere('company_email', 'ilike', `%${filters.search}%`)
          .orWhere('company_address', 'ilike', `%${filters.search}%`);
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

  async count(filters = {}) {
    let query = db('companies')
      .where('is_delete', false);

    // Apply filters
    if (filters.search) {
      query = query.where(function() {
        this.where('company_name', 'ilike', `%${filters.search}%`)
          .orWhere('company_email', 'ilike', `%${filters.search}%`)
          .orWhere('company_address', 'ilike', `%${filters.search}%`);
      });
    }

    const result = await query.count('company_id as count').first();
    return parseInt(result.count);
  }

  async findByIdWithChildren(id) {
    const company = await db('companies')
      .leftJoin('companies as children', 'companies.company_id', 'children.company_parent_id')
      .where('companies.company_id', id)
      .where('companies.is_delete', false)
      .select(
        'companies.*',
        db.raw('COUNT(children.company_id) as children_count')
      )
      .groupBy('companies.company_id')
      .first();
    return company;
  }

  /**
   * Find companies dengan filter standar (pagination, sorting, searching, filtering)
   * @param {Object} queryParams - Parsed query parameters dari parseStandardQuery
   * @returns {Object} Paginated response dengan data dan metadata
   */
  async findWithFilters(queryParams) {
    // Base query untuk data
    const baseQuery = db('companies')
      .select('*')
      .where('is_delete', false);

    // Query untuk count total records - buat query terpisah tanpa select *
    const countBaseQuery = db('companies')
      .where('is_delete', false);
    const countQuery = buildCountQuery(countBaseQuery, queryParams);
    const [{ count }] = await countQuery.count('company_id as count');
    const total = parseInt(count);

    // Apply filters dan pagination ke base query
    const dataQuery = applyStandardFilters(baseQuery.clone(), queryParams);
    const data = await dataQuery;

    // Format response dengan pagination metadata
    return formatPaginatedResponse(data, queryParams.pagination, total);
  }

  /**
   * Find companies dengan filter sederhana (tanpa pagination)
   * @param {Object} filters - Filter parameters
   * @returns {Array} Array of companies
   */
  async findWithSimpleFilters(filters = {}) {
    let query = db('companies')
      .select('*')
      .where('is_delete', false);

    // Apply search
    if (filters.search) {
      query = query.where(function() {
        this.where('company_name', 'ilike', `%${filters.search}%`)
          .orWhere('company_email', 'ilike', `%${filters.search}%`)
          .orWhere('company_address', 'ilike', `%${filters.search}%`);
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

module.exports = new CompaniesRepository();
