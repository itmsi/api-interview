const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class CandidatesRepository {
  async create(data) {
    const [candidate] = await db('candidates')
      .insert(data)
      .returning('*');
    return candidate;
  }

  async findById(id) {
    const candidate = await db('candidates')
      .where('candidate_id', id)
      .where('is_delete', false)
      .first();
    return candidate;
  }

  async findByIdWithRelations(id) {
    const candidate = await db('candidates')
      .leftJoin('companies', 'candidates.company_id', 'companies.company_id')
      .leftJoin('departments', 'candidates.departement_id', 'departments.department_id')
      .leftJoin('titles', 'candidates.title_id', 'titles.title_id')
      .leftJoin('genders', 'candidates.gender_id', 'genders.gender_id')
      .where('candidates.candidate_id', id)
      .where('candidates.is_delete', false)
      .select(
        'candidates.*',
        'companies.company_name',
        'departments.department_name',
        'titles.title_name',
        'genders.gender_name'
      )
      .first();
    return candidate;
  }

  async update(id, data) {
    const [candidate] = await db('candidates')
      .where('candidate_id', id)
      .where('is_delete', false)
      .update({
        ...data,
        update_at: db.fn.now()
      })
      .returning('*');
    return candidate;
  }

  async softDelete(id, deletedBy) {
    const [candidate] = await db('candidates')
      .where('candidate_id', id)
      .where('is_delete', false)
      .update({
        is_delete: true,
        delete_at: db.fn.now(),
        delete_by: deletedBy
      })
      .returning('*');
    return candidate;
  }

  async restore(id, updatedBy) {
    const [candidate] = await db('candidates')
      .where('candidate_id', id)
      .where('is_delete', true)
      .update({
        is_delete: false,
        delete_at: null,
        delete_by: null,
        update_at: db.fn.now(),
        update_by: updatedBy
      })
      .returning('*');
    return candidate;
  }

  /**
   * Find candidates dengan filter standar (pagination, sorting, searching, filtering)
   * @param {Object} queryParams - Parsed query parameters dari parseStandardQuery
   * @returns {Object} Paginated response dengan data dan metadata
   */
  async findWithFilters(queryParams) {
    // Base query untuk data
    const baseQuery = db('candidates')
      .leftJoin('companies', 'candidates.company_id', 'companies.company_id')
      .leftJoin('departments', 'candidates.departement_id', 'departments.department_id')
      .leftJoin('titles', 'candidates.title_id', 'titles.title_id')
      .leftJoin('genders', 'candidates.gender_id', 'genders.gender_id')
      .select(
        'candidates.*',
        'companies.company_name',
        'departments.department_name',
        'titles.title_name',
        'genders.gender_name'
      )
      .where('candidates.is_delete', false);

    // Query untuk count total records - buat query terpisah tanpa select
    const countBaseQuery = db('candidates')
      .leftJoin('companies', 'candidates.company_id', 'companies.company_id')
      .leftJoin('departments', 'candidates.departement_id', 'departments.department_id')
      .leftJoin('titles', 'candidates.title_id', 'titles.title_id')
      .leftJoin('genders', 'candidates.gender_id', 'genders.gender_id')
      .where('candidates.is_delete', false);
    const countQuery = buildCountQuery(countBaseQuery, queryParams);
    const [{ count }] = await countQuery.count('candidates.candidate_id as count');
    const total = parseInt(count);

    // Apply filters dan pagination ke base query
    const dataQuery = applyStandardFilters(baseQuery.clone(), queryParams);
    const data = await dataQuery;

    // Format response dengan pagination metadata
    return formatPaginatedResponse(data, queryParams.pagination, total);
  }

  /**
   * Find candidates dengan filter sederhana (tanpa pagination)
   * @param {Object} filters - Filter parameters
   * @returns {Array} Array of candidates
   */
  async findWithSimpleFilters(filters = {}) {
    let query = db('candidates')
      .leftJoin('companies', 'candidates.company_id', 'companies.company_id')
      .leftJoin('departments', 'candidates.departement_id', 'departments.department_id')
      .leftJoin('titles', 'candidates.title_id', 'titles.title_id')
      .leftJoin('genders', 'candidates.gender_id', 'genders.gender_id')
      .select(
        'candidates.*',
        'companies.company_name',
        'departments.department_name',
        'titles.title_name',
        'genders.gender_name'
      )
      .where('candidates.is_delete', false);

    // Apply search
    if (filters.search) {
      query = query.where(function() {
        this.where('candidates.candidate_name', 'ilike', `%${filters.search}%`)
          .orWhere('candidates.candidate_email', 'ilike', `%${filters.search}%`)
          .orWhere('candidates.candidate_phone', 'ilike', `%${filters.search}%`)
          .orWhere('candidates.candidate_city', 'ilike', `%${filters.search}%`)
          .orWhere('candidates.candidate_country', 'ilike', `%${filters.search}%`);
      });
    }

    // Apply sorting
    if (filters.sort_by) {
      const sortOrder = filters.sort_order || 'asc';
      query = query.orderBy(`candidates.${filters.sort_by}`, sortOrder);
    } else {
      query = query.orderBy('candidates.create_at', 'desc');
    }

    return query;
  }

  async count(filters = {}) {
    let query = db('candidates')
      .where('is_delete', false);

    // Apply filters
    if (filters.search) {
      query = query.where(function() {
        this.where('candidate_name', 'ilike', `%${filters.search}%`)
          .orWhere('candidate_email', 'ilike', `%${filters.search}%`)
          .orWhere('candidate_phone', 'ilike', `%${filters.search}%`)
          .orWhere('candidate_city', 'ilike', `%${filters.search}%`)
          .orWhere('candidate_country', 'ilike', `%${filters.search}%`);
      });
    }

    const result = await query.count('candidate_id as count').first();
    return parseInt(result.count);
  }
}

module.exports = new CandidatesRepository();
