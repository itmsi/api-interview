const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class OnBoardDocumentsRepository {
  async create(data) {
    const [onBoardDocument] = await db('on_board_documents')
      .insert(data)
      .returning('*');
    return onBoardDocument;
  }

  async findById(id) {
    const onBoardDocument = await db('on_board_documents')
      .leftJoin('candidates', 'on_board_documents.candidate_id', 'candidates.candidate_id')
      .where('on_board_documents.on_board_documents_id', id)
      .where('on_board_documents.delete_at', null)
      .select(
        'on_board_documents.*',
        'candidates.candidate_name',
        'candidates.candidate_email'
      )
      .first();
    return onBoardDocument;
  }

  async findByIdWithRelations(id) {
    const onBoardDocument = await db('on_board_documents')
      .leftJoin('candidates', 'on_board_documents.candidate_id', 'candidates.candidate_id')
      .leftJoin('companies', 'candidates.company_id', 'companies.company_id')
      .leftJoin('departments', 'candidates.departement_id', 'departments.department_id')
      .leftJoin('titles', 'candidates.title_id', 'titles.title_id')
      .where('on_board_documents.on_board_documents_id', id)
      .where('on_board_documents.delete_at', null)
      .select(
        'on_board_documents.*',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'candidates.candidate_phone',
        'companies.company_name',
        'departments.department_name',
        'titles.title_name'
      )
      .first();
    return onBoardDocument;
  }

  async update(id, data) {
    const [onBoardDocument] = await db('on_board_documents')
      .where('on_board_documents_id', id)
      .where('delete_at', null)
      .update({
        ...data,
        update_at: db.fn.now()
      })
      .returning('*');
    return onBoardDocument;
  }

  async softDelete(id, deletedBy) {
    const [onBoardDocument] = await db('on_board_documents')
      .where('on_board_documents_id', id)
      .where('delete_at', null)
      .update({
        delete_at: db.fn.now(),
        delete_by: deletedBy
      })
      .returning('*');
    return onBoardDocument;
  }

  async restore(id, updatedBy) {
    const [onBoardDocument] = await db('on_board_documents')
      .where('on_board_documents_id', id)
      .where('delete_at', '!=', null)
      .update({
        delete_at: null,
        delete_by: null,
        update_at: db.fn.now(),
        update_by: updatedBy
      })
      .returning('*');
    return onBoardDocument;
  }

  /**
   * Find on board documents dengan filter standar (pagination, sorting, searching, filtering)
   * @param {Object} queryParams - Parsed query parameters dari parseStandardQuery
   * @returns {Object} Paginated response dengan data dan metadata
   */
  async findWithFilters(queryParams) {
    // Base query untuk data
    const baseQuery = db('on_board_documents')
      .leftJoin('candidates', 'on_board_documents.candidate_id', 'candidates.candidate_id')
      .leftJoin('companies', 'candidates.company_id', 'companies.company_id')
      .leftJoin('departments', 'candidates.departement_id', 'departments.department_id')
      .leftJoin('titles', 'candidates.title_id', 'titles.title_id')
      .select(
        'on_board_documents.*',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'candidates.candidate_phone',
        'companies.company_name',
        'departments.department_name',
        'titles.title_name'
      )
      .where('on_board_documents.delete_at', null);

    // Query untuk count total records - buat query terpisah tanpa select
    const countBaseQuery = db('on_board_documents')
      .leftJoin('candidates', 'on_board_documents.candidate_id', 'candidates.candidate_id')
      .leftJoin('companies', 'candidates.company_id', 'companies.company_id')
      .leftJoin('departments', 'candidates.departement_id', 'departments.department_id')
      .leftJoin('titles', 'candidates.title_id', 'titles.title_id')
      .where('on_board_documents.delete_at', null);
    const countQuery = buildCountQuery(countBaseQuery, queryParams);
    const [{ count }] = await countQuery.count('on_board_documents.on_board_documents_id as count');
    const total = parseInt(count);

    // Apply filters dan pagination ke base query
    const dataQuery = applyStandardFilters(baseQuery.clone(), queryParams);
    const data = await dataQuery;

    // Format response dengan pagination metadata
    return formatPaginatedResponse(data, queryParams.pagination, total);
  }

  /**
   * Find on board documents dengan filter sederhana (tanpa pagination)
   * @param {Object} filters - Filter parameters
   * @returns {Array} Array of on board documents
   */
  async findWithSimpleFilters(filters = {}) {
    let query = db('on_board_documents')
      .leftJoin('candidates', 'on_board_documents.candidate_id', 'candidates.candidate_id')
      .leftJoin('companies', 'candidates.company_id', 'companies.company_id')
      .leftJoin('departments', 'candidates.departement_id', 'departments.department_id')
      .leftJoin('titles', 'candidates.title_id', 'titles.title_id')
      .select(
        'on_board_documents.*',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'candidates.candidate_phone',
        'companies.company_name',
        'departments.department_name',
        'titles.title_name'
      )
      .where('on_board_documents.delete_at', null);

    // Apply search
    if (filters.search) {
      query = query.where(function() {
        this.where('on_board_documents.on_board_documents_name', 'ilike', `%${filters.search}%`)
          .orWhere('candidates.candidate_name', 'ilike', `%${filters.search}%`)
          .orWhere('candidates.candidate_email', 'ilike', `%${filters.search}%`)
          .orWhere('companies.company_name', 'ilike', `%${filters.search}%`)
          .orWhere('departments.department_name', 'ilike', `%${filters.search}%`);
      });
    }

    // Apply sorting
    if (filters.sort_by) {
      const sortOrder = filters.sort_order || 'asc';
      query = query.orderBy(`on_board_documents.${filters.sort_by}`, sortOrder);
    } else {
      query = query.orderBy('on_board_documents.create_at', 'desc');
    }

    return query;
  }

  async count(filters = {}) {
    let query = db('on_board_documents')
      .leftJoin('candidates', 'on_board_documents.candidate_id', 'candidates.candidate_id')
      .leftJoin('companies', 'candidates.company_id', 'companies.company_id')
      .leftJoin('departments', 'candidates.departement_id', 'departments.department_id')
      .leftJoin('titles', 'candidates.title_id', 'titles.title_id')
      .where('on_board_documents.delete_at', null);

    // Apply filters
    if (filters.search) {
      query = query.where(function() {
        this.where('on_board_documents.on_board_documents_name', 'ilike', `%${filters.search}%`)
          .orWhere('candidates.candidate_name', 'ilike', `%${filters.search}%`)
          .orWhere('candidates.candidate_email', 'ilike', `%${filters.search}%`)
          .orWhere('companies.company_name', 'ilike', `%${filters.search}%`)
          .orWhere('departments.department_name', 'ilike', `%${filters.search}%`);
      });
    }

    const result = await query.count('on_board_documents.on_board_documents_id as count').first();
    return parseInt(result.count);
  }

  /**
   * Find on board documents by candidate ID
   * @param {string} candidateId - Candidate ID
   * @returns {Array} Array of on board documents for the candidate
   */
  async findByCandidateId(candidateId) {
    const onBoardDocuments = await db('on_board_documents')
      .leftJoin('candidates', 'on_board_documents.candidate_id', 'candidates.candidate_id')
      .where('on_board_documents.candidate_id', candidateId)
      .where('on_board_documents.delete_at', null)
      .select(
        'on_board_documents.*',
        'candidates.candidate_name',
        'candidates.candidate_email'
      )
      .orderBy('on_board_documents.create_at', 'desc');
    return onBoardDocuments;
  }
}

module.exports = new OnBoardDocumentsRepository();
