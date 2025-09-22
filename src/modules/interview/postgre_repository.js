const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class InterviewRepository {
  async create(data) {
    const trx = await db.transaction();
    
    try {
      // Insert interview
      const [interview] = await trx('interview')
        .insert({
          schedule_interview_id: data.schedule_interview_id,
          company_value: data.company_value,
          comment: data.comment || null,
          employee_id: data.employee_id || null,
          create_by: data.create_by
        })
        .returning('*');

      // Insert detail_interview jika ada data detail
      if (data.aspect || data.question || data.answer || data.score !== undefined) {
        await trx('detail_interview')
          .insert({
            interview_id: interview.interview_id,
            aspect: data.aspect || null,
            question: data.question || null,
            answer: data.answer || null,
            score: data.score || 0,
            create_by: data.create_by
          });
      }

      await trx.commit();
      
      // Return data with details
      return await this.findByIdWithDetails(interview.interview_id);
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async findById(id) {
    const interview = await db('interview')
      .where('interview_id', id)
      .where('is_delete', false)
      .first();
    return interview;
  }

  async findByIdWithDetails(id) {
    const interview = await db('interview')
      .leftJoin('schedule_interview', 'interview.schedule_interview_id', 'schedule_interview.schedule_interview_id')
      .leftJoin('employees', 'interview.employee_id', 'employees.employee_id')
      .leftJoin('candidates', 'schedule_interview.candidate_id', 'candidates.candidate_id')
      .where('interview.interview_id', id)
      .where('interview.is_delete', false)
      .select(
        'interview.*',
        'schedule_interview.schedule_interview_date',
        'schedule_interview.schedule_interview_time',
        'schedule_interview.assign_role',
        'employees.employee_name',
        'employees.employee_email',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'candidates.candidate_phone'
      )
      .first();

    if (!interview) {
      return null;
    }

    // Get interview details
    const details = await db('detail_interview')
      .where('detail_interview.interview_id', id)
      .where('detail_interview.is_delete', false)
      .select('*');

    interview.details = details;
    return interview;
  }

  async update(id, data) {
    const trx = await db.transaction();
    
    try {
      // Update interview
      const updateData = {
        update_at: db.fn.now(),
        update_by: data.update_by
      };

      if (data.schedule_interview_id !== undefined) updateData.schedule_interview_id = data.schedule_interview_id;
      if (data.company_value !== undefined) updateData.company_value = data.company_value;
      if (data.comment !== undefined) updateData.comment = data.comment;
      if (data.employee_id !== undefined) updateData.employee_id = data.employee_id;

      const [interview] = await trx('interview')
        .where('interview_id', id)
        .where('is_delete', false)
        .update(updateData)
        .returning('*');

      if (!interview) {
        throw new Error('Interview not found');
      }

      // Update detail_interview jika ada data detail
      if (data.aspect !== undefined || data.question !== undefined || data.answer !== undefined || data.score !== undefined) {
        // Cari detail yang sudah ada
        const existingDetail = await trx('detail_interview')
          .where('interview_id', id)
          .where('is_delete', false)
          .first();

        if (existingDetail) {
          // Update detail yang sudah ada
          const detailUpdateData = {
            update_at: db.fn.now(),
            update_by: data.update_by
          };

          if (data.aspect !== undefined) detailUpdateData.aspect = data.aspect;
          if (data.question !== undefined) detailUpdateData.question = data.question;
          if (data.answer !== undefined) detailUpdateData.answer = data.answer;
          if (data.score !== undefined) detailUpdateData.score = data.score;

          await trx('detail_interview')
            .where('detail_interview_id', existingDetail.detail_interview_id)
            .update(detailUpdateData);
        } else {
          // Buat detail baru jika belum ada
          await trx('detail_interview')
            .insert({
              interview_id: id,
              aspect: data.aspect || null,
              question: data.question || null,
              answer: data.answer || null,
              score: data.score || 0,
              create_by: data.update_by
            });
        }
      }

      await trx.commit();
      
      // Return updated data with details
      return await this.findByIdWithDetails(id);
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async softDelete(id, deletedBy) {
    const trx = await db.transaction();
    
    try {
      // Soft delete interview
      const [interview] = await trx('interview')
        .where('interview_id', id)
        .where('is_delete', false)
        .update({
          is_delete: true,
          delete_at: db.fn.now(),
          delete_by: deletedBy
        })
        .returning('*');

      if (!interview) {
        throw new Error('Interview not found');
      }

      // Soft delete related details
      await trx('detail_interview')
        .where('interview_id', id)
        .update({
          is_delete: true,
          delete_at: db.fn.now(),
          delete_by: deletedBy
        });

      await trx.commit();
      return interview;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async restore(id, updatedBy) {
    const trx = await db.transaction();
    
    try {
      const [interview] = await trx('interview')
        .where('interview_id', id)
        .where('is_delete', true)
        .update({
          is_delete: false,
          delete_at: null,
          delete_by: null,
          update_at: db.fn.now(),
          update_by: updatedBy
        })
        .returning('*');

      if (interview) {
        // Restore related details
        await trx('detail_interview')
          .where('interview_id', id)
          .update({
            is_delete: false,
            delete_at: null,
            delete_by: null,
            update_at: db.fn.now(),
            update_by: updatedBy
          });
      }

      await trx.commit();
      return interview;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  /**
   * Find interviews dengan filter standar (pagination, sorting, searching, filtering)
   * @param {Object} queryParams - Parsed query parameters dari parseStandardQuery
   * @returns {Object} Paginated response dengan data dan metadata
   */
  async findWithFilters(queryParams) {
    // Base query untuk data
    const baseQuery = db('interview')
      .leftJoin('schedule_interview', 'interview.schedule_interview_id', 'schedule_interview.schedule_interview_id')
      .leftJoin('employees', 'interview.employee_id', 'employees.employee_id')
      .leftJoin('candidates', 'schedule_interview.candidate_id', 'candidates.candidate_id')
      .select(
        'interview.*',
        'schedule_interview.schedule_interview_date',
        'schedule_interview.schedule_interview_time',
        'schedule_interview.assign_role',
        'employees.employee_name',
        'employees.employee_email',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'candidates.candidate_phone'
      )
      .where('interview.is_delete', false);

    // Query untuk count total records - buat query terpisah tanpa select
    const countBaseQuery = db('interview')
      .leftJoin('schedule_interview', 'interview.schedule_interview_id', 'schedule_interview.schedule_interview_id')
      .leftJoin('employees', 'interview.employee_id', 'employees.employee_id')
      .leftJoin('candidates', 'schedule_interview.candidate_id', 'candidates.candidate_id')
      .where('interview.is_delete', false);
    const countQuery = buildCountQuery(countBaseQuery, queryParams);
    const [{ count }] = await countQuery.count('interview.interview_id as count');
    const total = parseInt(count);

    // Apply filters dan pagination ke base query
    const dataQuery = applyStandardFilters(baseQuery.clone(), queryParams);
    const data = await dataQuery;

    // Get details for each interview
    for (let i = 0; i < data.length; i++) {
      const details = await db('detail_interview')
        .where('detail_interview.interview_id', data[i].interview_id)
        .where('detail_interview.is_delete', false)
        .select('*');
      
      data[i].details = details;
    }

    // Format response dengan pagination metadata
    return formatPaginatedResponse(data, queryParams.pagination, total);
  }

  async count(filters = {}) {
    let query = db('interview')
      .where('is_delete', false);

    // Apply filters
    if (filters.search) {
      query = query.leftJoin('schedule_interview', 'interview.schedule_interview_id', 'schedule_interview.schedule_interview_id')
        .leftJoin('employees', 'interview.employee_id', 'employees.employee_id')
        .leftJoin('candidates', 'schedule_interview.candidate_id', 'candidates.candidate_id')
        .where(function() {
          this.where('interview.company_value', 'ilike', `%${filters.search}%`)
            .orWhere('interview.comment', 'ilike', `%${filters.search}%`)
            .orWhere('employees.employee_name', 'ilike', `%${filters.search}%`)
            .orWhere('candidates.candidate_name', 'ilike', `%${filters.search}%`);
        });
    }

    const result = await query.count('interview.interview_id as count').first();
    return parseInt(result.count);
  }
}

module.exports = new InterviewRepository();
