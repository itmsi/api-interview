const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class EmployeesRepository {
  async findById(id) {
    const employee = await db('employees')
      .where('employee_id', id)
      .where('is_delete', false)
      .first();
    return employee;
  }

  async findByIdWithRelations(id) {
    const employee = await db('employees')
      .leftJoin('titles', 'employees.title_id', 'titles.title_id')
      .leftJoin('departments', 'employees.department_id', 'departments.department_id')
      .leftJoin('companies', 'departments.company_id', 'companies.company_id')
      .leftJoin('genders', 'employees.gender_id', 'genders.gender_id')
      .leftJoin('islands', 'employees.island_id', 'islands.island_id')
      .where('employees.employee_id', id)
      .where('employees.is_delete', false)
      .select(
        'employees.*',
        'titles.title_name',
        'departments.department_name',
        'departments.department_segmentasi',
        'companies.company_name',
        'genders.gender_name',
        'islands.island_name'
      )
      .first();
    return employee;
  }

  /**
   * Find employees dengan filter standar (pagination, sorting, searching, filtering)
   * @param {Object} queryParams - Parsed query parameters dari parseStandardQuery
   * @returns {Object} Paginated response dengan data dan metadata
   */
  async findWithFilters(queryParams) {
    // Base query untuk data
    const baseQuery = db('employees')
      .leftJoin('titles', 'employees.title_id', 'titles.title_id')
      .leftJoin('departments', 'employees.department_id', 'departments.department_id')
      .leftJoin('companies', 'departments.company_id', 'companies.company_id')
      .leftJoin('genders', 'employees.gender_id', 'genders.gender_id')
      .leftJoin('islands', 'employees.island_id', 'islands.island_id')
      .select(
        'employees.*',
        'titles.title_name',
        'departments.department_name',
        'companies.company_name',
        'genders.gender_name',
        'islands.island_name'
      )
      .where('employees.is_delete', false);

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
   * Find employees dengan filter sederhana (tanpa pagination)
   * @param {Object} filters - Filter parameters
   * @returns {Array} Array of employees
   */
  async findWithSimpleFilters(filters = {}) {
    let query = db('employees')
      .leftJoin('titles', 'employees.title_id', 'titles.title_id')
      .leftJoin('departments', 'employees.department_id', 'departments.department_id')
      .leftJoin('companies', 'departments.company_id', 'companies.company_id')
      .leftJoin('genders', 'employees.gender_id', 'genders.gender_id')
      .leftJoin('islands', 'employees.island_id', 'islands.island_id')
      .select(
        'employees.*',
        'titles.title_name',
        'departments.department_name',
        'companies.company_name',
        'genders.gender_name',
        'islands.island_name'
      )
      .where('employees.is_delete', false);

    // Apply search
    if (filters.search) {
      query = query.where(function() {
        this.where('employees.employee_name', 'ilike', `%${filters.search}%`)
          .orWhere('employees.employee_email', 'ilike', `%${filters.search}%`)
          .orWhere('employees.employee_mobile', 'ilike', `%${filters.search}%`)
          .orWhere('employees.employee_address', 'ilike', `%${filters.search}%`);
      });
    }

    // Apply sorting
    if (filters.sort_by) {
      const sortOrder = filters.sort_order || 'asc';
      query = query.orderBy(`employees.${filters.sort_by}`, sortOrder);
    } else {
      query = query.orderBy('employees.created_at', 'desc');
    }

    return query;
  }
}

module.exports = new EmployeesRepository();
