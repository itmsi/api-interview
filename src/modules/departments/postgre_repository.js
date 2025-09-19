const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class DepartmentsRepository {
  async findById(id) {
    const department = await db('departments')
      .where('department_id', id)
      .where('is_delete', false)
      .first();
    return department;
  }

  async findAll(filters = {}) {
    let query = db('departments')
      .where('is_delete', false);

    // Apply filters
    if (filters.search) {
      query = query.where(function() {
        this.where('department_name', 'ilike', `%${filters.search}%`)
          .orWhere('department_segmentasi', 'ilike', `%${filters.search}%`);
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
    let query = db('departments')
      .where('is_delete', false);

    // Apply filters
    if (filters.search) {
      query = query.where(function() {
        this.where('department_name', 'ilike', `%${filters.search}%`)
          .orWhere('department_segmentasi', 'ilike', `%${filters.search}%`);
      });
    }

    const result = await query.count('department_id as count').first();
    return parseInt(result.count);
  }

  async findByIdWithCompany(id) {
    const department = await db('departments')
      .leftJoin('companies', 'departments.company_id', 'companies.company_id')
      .where('departments.department_id', id)
      .where('departments.is_delete', false)
      .select(
        'departments.*',
        'companies.company_name',
        'companies.company_email',
        'companies.company_address'
      )
      .first();
    return department;
  }

  async findByIdWithChildren(id) {
    const department = await db('departments')
      .leftJoin('departments as children', 'departments.department_id', 'children.department_parent_id')
      .where('departments.department_id', id)
      .where('departments.is_delete', false)
      .select(
        'departments.*',
        db.raw('COUNT(children.department_id) as children_count')
      )
      .groupBy('departments.department_id')
      .first();
    return department;
  }

  /**
   * Find departments dengan filter standar (pagination, sorting, searching, filtering)
   * @param {Object} queryParams - Parsed query parameters dari parseStandardQuery
   * @returns {Object} Paginated response dengan data dan metadata
   */
  async findWithFilters(queryParams) {
    // Base query untuk data
    const baseQuery = db('departments')
      .leftJoin('companies', 'departments.company_id', 'companies.company_id')
      .select(
        'departments.*',
        'companies.company_name'
      )
      .where('departments.is_delete', false);

    // Query untuk count total records - buat query terpisah tanpa select
    const countBaseQuery = db('departments')
      .leftJoin('companies', 'departments.company_id', 'companies.company_id')
      .where('departments.is_delete', false);
    const countQuery = buildCountQuery(countBaseQuery, queryParams);
    const [{ count }] = await countQuery.count('departments.department_id as count');
    const total = parseInt(count);

    // Apply filters dan pagination ke base query
    const dataQuery = applyStandardFilters(baseQuery.clone(), queryParams);
    const data = await dataQuery;

    // Format response dengan pagination metadata
    return formatPaginatedResponse(data, queryParams.pagination, total);
  }

  /**
   * Find departments dengan filter sederhana (tanpa pagination)
   * @param {Object} filters - Filter parameters
   * @returns {Array} Array of departments
   */
  async findWithSimpleFilters(filters = {}) {
    let query = db('departments')
      .leftJoin('companies', 'departments.company_id', 'companies.company_id')
      .select(
        'departments.*',
        'companies.company_name'
      )
      .where('departments.is_delete', false);

    // Apply search
    if (filters.search) {
      query = query.where(function() {
        this.where('departments.department_name', 'ilike', `%${filters.search}%`)
          .orWhere('departments.department_segmentasi', 'ilike', `%${filters.search}%`);
      });
    }

    // Apply sorting
    if (filters.sort_by) {
      const sortOrder = filters.sort_order || 'asc';
      query = query.orderBy(`departments.${filters.sort_by}`, sortOrder);
    } else {
      query = query.orderBy('departments.created_at', 'desc');
    }

    return query;
  }
}

module.exports = new DepartmentsRepository();
