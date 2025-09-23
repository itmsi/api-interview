const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class ReviewInterviewRepository {

  /**
   * Find review interview data with filters and pagination
   * Menggabungkan data dari tabel candidates, interview, companies, titles, dan departments
   */
  async findWithFilters(queryParams) {
    try {
      // Base query untuk data dengan JOIN ke tabel terkait dan GROUP BY untuk menghindari duplikat
      const baseQuery = db('candidates')
        .select([
          'candidates.candidate_id',
          'candidates.candidate_name',
          'candidates.candidate_email',
          'candidates.candidate_foto',
          'candidates.create_at',
          'companies.company_name',
          'titles.title_name'
        ])
        .leftJoin('schedule_interview', 'candidates.candidate_id', 'schedule_interview.candidate_id')
        .leftJoin('interview', function() {
          this.on('schedule_interview.schedule_interview_id', '=', 'interview.schedule_interview_id')
              .andOn('interview.is_delete', '=', db.raw('false'));
        })
        .leftJoin('companies', 'candidates.company_id', 'companies.company_id')
        .leftJoin('titles', 'candidates.title_id', 'titles.title_id')
        .leftJoin('departments', 'candidates.departement_id', 'departments.department_id')
        .where('candidates.is_delete', false)
        .where('schedule_interview.is_delete', false)
        .where('companies.is_delete', false)
        .where('titles.is_delete', false)
        .whereNotNull('interview.interview_id') // Hanya ambil kandidat yang sudah ada interview-nya
        .groupBy([
          'candidates.candidate_id',
          'candidates.candidate_name', 
          'candidates.candidate_email',
          'candidates.candidate_foto',
          'candidates.create_at',
          'companies.company_name',
          'titles.title_name'
        ]);

      // Apply custom filters dengan explicit table prefix
      let filteredQuery = baseQuery.clone();
      
      if (queryParams.filters.interview_id) {
        filteredQuery = filteredQuery.where('interview.interview_id', queryParams.filters.interview_id);
      }

      if (queryParams.filters.candidate_id) {
        filteredQuery = filteredQuery.where('candidates.candidate_id', queryParams.filters.candidate_id);
      }

      if (queryParams.filters.company_id) {
        filteredQuery = filteredQuery.where('candidates.company_id', queryParams.filters.company_id);
      }

      if (queryParams.filters.title_id) {
        filteredQuery = filteredQuery.where('candidates.title_id', queryParams.filters.title_id);
      }

      if (queryParams.filters.departement_id) {
        filteredQuery = filteredQuery.where('candidates.departement_id', queryParams.filters.departement_id);
      }

      // Apply search dengan explicit table prefix
      if (queryParams.search && queryParams.search.trim() !== '') {
        filteredQuery = filteredQuery.where(function() {
          this.where('candidates.candidate_name', 'ilike', `%${queryParams.search}%`)
              .orWhere('candidates.candidate_email', 'ilike', `%${queryParams.search}%`)
              .orWhere('companies.company_name', 'ilike', `%${queryParams.search}%`)
              .orWhere('titles.title_name', 'ilike', `%${queryParams.search}%`);
        });
      }

      // Query untuk count total records dengan GROUP BY untuk menghindari duplikat
      const countQuery = db('candidates')
        .leftJoin('schedule_interview', 'candidates.candidate_id', 'schedule_interview.candidate_id')
        .leftJoin('interview', function() {
          this.on('schedule_interview.schedule_interview_id', '=', 'interview.schedule_interview_id')
              .andOn('interview.is_delete', '=', db.raw('false'));
        })
        .leftJoin('companies', 'candidates.company_id', 'companies.company_id')
        .leftJoin('titles', 'candidates.title_id', 'titles.title_id')
        .leftJoin('departments', 'candidates.departement_id', 'departments.department_id')
        .where('candidates.is_delete', false)
        .where('schedule_interview.is_delete', false)
        .where('companies.is_delete', false)
        .where('titles.is_delete', false)
        .whereNotNull('interview.interview_id') // Hanya ambil kandidat yang sudah ada interview-nya
        .groupBy('candidates.candidate_id');

      // Apply filters yang sama ke count query
      let countQueryFiltered = countQuery.clone();
      
      if (queryParams.filters.interview_id) {
        countQueryFiltered = countQueryFiltered.where('interview.interview_id', queryParams.filters.interview_id);
      }

      if (queryParams.filters.candidate_id) {
        countQueryFiltered = countQueryFiltered.where('candidates.candidate_id', queryParams.filters.candidate_id);
      }

      if (queryParams.filters.company_id) {
        countQueryFiltered = countQueryFiltered.where('candidates.company_id', queryParams.filters.company_id);
      }

      if (queryParams.filters.title_id) {
        countQueryFiltered = countQueryFiltered.where('candidates.title_id', queryParams.filters.title_id);
      }

      if (queryParams.filters.departement_id) {
        countQueryFiltered = countQueryFiltered.where('candidates.departement_id', queryParams.filters.departement_id);
      }

      // Apply search ke count query
      if (queryParams.search && queryParams.search.trim() !== '') {
        countQueryFiltered = countQueryFiltered.where(function() {
          this.where('candidates.candidate_name', 'ilike', `%${queryParams.search}%`)
              .orWhere('candidates.candidate_email', 'ilike', `%${queryParams.search}%`)
              .orWhere('companies.company_name', 'ilike', `%${queryParams.search}%`)
              .orWhere('titles.title_name', 'ilike', `%${queryParams.search}%`);
        });
      }

      const totalResult = await countQueryFiltered.count('candidates.candidate_id as count');
      const total = totalResult.length;

      // Apply sorting dengan explicit table prefix
      let sortColumn = queryParams.sorting.sortBy;
      const sortDirection = queryParams.sorting.sortOrder;

      // Map sort column dengan table prefix
      if (['candidate_name', 'candidate_email', 'create_at'].includes(sortColumn)) {
        sortColumn = `candidates.${sortColumn}`;
      } else if (sortColumn === 'company_name') {
        sortColumn = 'companies.company_name';
      } else if (sortColumn === 'title_name') {
        sortColumn = 'titles.title_name';
      } else {
        sortColumn = 'candidates.create_at'; // default
      }

      // Apply sorting dan pagination
      const dataQuery = filteredQuery.clone()
        .orderBy(sortColumn, sortDirection)
        .limit(queryParams.pagination.limit)
        .offset(queryParams.pagination.offset);

      const data = await dataQuery;

      // Format response dengan pagination metadata
      return formatPaginatedResponse(data, queryParams.pagination, parseInt(total));

    } catch (error) {
      console.error('Error in ReviewInterviewRepository.findWithFilters:', error);
      throw error;
    }
  }
}

module.exports = new ReviewInterviewRepository();
