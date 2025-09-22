const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class ScheduleInterviewRepository {
  async create(data) {
    const trx = await db.transaction();
    
    try {
      // Insert schedule_interview
      const [scheduleInterview] = await trx('schedule_interview')
        .insert({
          candidate_id: data.candidate_id,
          assign_role: data.assign_role || '',
          schedule_interview_date: data.schedule_interview_date,
          schedule_interview_time: data.schedule_interview_time,
          schedule_interview_duration: data.schedule_interview_duration || '',
          create_by: data.create_by
        })
        .returning('*');

      // Insert schedule_interview_details jika ada employee_id
      if (data.employee_id && Array.isArray(data.employee_id) && data.employee_id.length > 0) {
        const detailsData = data.employee_id.map(employeeId => ({
          schedule_interview_id: scheduleInterview.schedule_interview_id,
          employee_id: employeeId,
          create_by: data.create_by
        }));

        await trx('schedule_interview_details').insert(detailsData);
      }

      await trx.commit();
      
      // Return data with details
      return await this.findByIdWithDetails(scheduleInterview.schedule_interview_id);
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async findById(id) {
    const scheduleInterview = await db('schedule_interview')
      .where('schedule_interview_id', id)
      .where('is_delete', false)
      .first();
    return scheduleInterview;
  }

  async findByIdWithDetails(id) {
    const scheduleInterview = await db('schedule_interview')
      .leftJoin('candidates', 'schedule_interview.candidate_id', 'candidates.candidate_id')
      .where('schedule_interview.schedule_interview_id', id)
      .where('schedule_interview.is_delete', false)
      .select(
        'schedule_interview.*',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'candidates.candidate_phone'
      )
      .first();

    if (!scheduleInterview) {
      return null;
    }

    // Get interview details
    const details = await db('schedule_interview_details')
      .leftJoin('employees', 'schedule_interview_details.employee_id', 'employees.employee_id')
      .where('schedule_interview_details.schedule_interview_id', id)
      .where('schedule_interview_details.is_delete', false)
      .select(
        'schedule_interview_details.*',
        'employees.employee_name',
        'employees.employee_email'
      );

    scheduleInterview.details = details;
    return scheduleInterview;
  }

  async update(id, data) {
    const trx = await db.transaction();
    
    try {
      // Update schedule_interview
      const updateData = {
        update_at: db.fn.now(),
        update_by: data.update_by
      };

      if (data.assign_role !== undefined) updateData.assign_role = data.assign_role || '';
      if (data.schedule_interview_date !== undefined) updateData.schedule_interview_date = data.schedule_interview_date;
      if (data.schedule_interview_time !== undefined) updateData.schedule_interview_time = data.schedule_interview_time;
      if (data.schedule_interview_duration !== undefined) updateData.schedule_interview_duration = data.schedule_interview_duration || '';

      const [scheduleInterview] = await trx('schedule_interview')
        .where('schedule_interview_id', id)
        .where('is_delete', false)
        .update(updateData)
        .returning('*');

      if (!scheduleInterview) {
        throw new Error('Schedule interview not found');
      }

      // Update schedule_interview_details jika ada employee_id
      if (data.employee_id !== undefined) {
        // Soft delete existing details
        await trx('schedule_interview_details')
          .where('schedule_interview_id', id)
          .update({
            is_delete: true,
            delete_at: db.fn.now(),
            delete_by: data.update_by
          });

        // Insert new details jika ada employee_id
        if (Array.isArray(data.employee_id) && data.employee_id.length > 0) {
          const detailsData = data.employee_id.map(employeeId => ({
            schedule_interview_id: id,
            employee_id: employeeId,
            create_by: data.update_by
          }));

          await trx('schedule_interview_details').insert(detailsData);
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
      // Soft delete schedule_interview
      const [scheduleInterview] = await trx('schedule_interview')
        .where('schedule_interview_id', id)
        .where('is_delete', false)
        .update({
          is_delete: true,
          delete_at: db.fn.now(),
          delete_by: deletedBy
        })
        .returning('*');

      if (!scheduleInterview) {
        throw new Error('Schedule interview not found');
      }

      // Soft delete related details
      await trx('schedule_interview_details')
        .where('schedule_interview_id', id)
        .update({
          is_delete: true,
          delete_at: db.fn.now(),
          delete_by: deletedBy
        });

      await trx.commit();
      return scheduleInterview;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async restore(id, updatedBy) {
    const trx = await db.transaction();
    
    try {
      const [scheduleInterview] = await trx('schedule_interview')
        .where('schedule_interview_id', id)
        .where('is_delete', true)
        .update({
          is_delete: false,
          delete_at: null,
          delete_by: null,
          update_at: db.fn.now(),
          update_by: updatedBy
        })
        .returning('*');

      if (scheduleInterview) {
        // Restore related details
        await trx('schedule_interview_details')
          .where('schedule_interview_id', id)
          .update({
            is_delete: false,
            delete_at: null,
            delete_by: null,
            update_at: db.fn.now(),
            update_by: updatedBy
          });
      }

      await trx.commit();
      return scheduleInterview;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  /**
   * Find schedule interviews dengan filter standar (pagination, sorting, searching, filtering)
   * @param {Object} queryParams - Parsed query parameters dari parseStandardQuery
   * @returns {Object} Paginated response dengan data dan metadata
   */
  async findWithFilters(queryParams) {
    // Base query untuk data
    const baseQuery = db('schedule_interview')
      .leftJoin('candidates', 'schedule_interview.candidate_id', 'candidates.candidate_id')
      .select(
        'schedule_interview.*',
        'candidates.candidate_name',
        'candidates.candidate_email',
        'candidates.candidate_phone'
      )
      .where('schedule_interview.is_delete', false);

    // Query untuk count total records - buat query terpisah tanpa select
    const countBaseQuery = db('schedule_interview')
      .leftJoin('candidates', 'schedule_interview.candidate_id', 'candidates.candidate_id')
      .where('schedule_interview.is_delete', false);
    const countQuery = buildCountQuery(countBaseQuery, queryParams);
    const [{ count }] = await countQuery.count('schedule_interview.schedule_interview_id as count');
    const total = parseInt(count);

    // Apply filters dan pagination ke base query
    const dataQuery = applyStandardFilters(baseQuery.clone(), queryParams);
    const data = await dataQuery;

    // Get details for each schedule interview
    for (let i = 0; i < data.length; i++) {
      const details = await db('schedule_interview_details')
        .leftJoin('employees', 'schedule_interview_details.employee_id', 'employees.employee_id')
        .where('schedule_interview_details.schedule_interview_id', data[i].schedule_interview_id)
        .where('schedule_interview_details.is_delete', false)
        .select(
          'schedule_interview_details.*',
          'employees.employee_name',
          'employees.employee_email'
        );
      
      data[i].details = details;
    }

    // Format response dengan pagination metadata
    return formatPaginatedResponse(data, queryParams.pagination, total);
  }

  async count(filters = {}) {
    let query = db('schedule_interview')
      .where('is_delete', false);

    // Apply filters
    if (filters.search) {
      query = query.leftJoin('candidates', 'schedule_interview.candidate_id', 'candidates.candidate_id')
        .where(function() {
          this.where('candidates.candidate_name', 'ilike', `%${filters.search}%`)
            .orWhere('schedule_interview.assign_role', 'ilike', `%${filters.search}%`);
        });
    }

    const result = await query.count('schedule_interview.schedule_interview_id as count').first();
    return parseInt(result.count);
  }
}

module.exports = new ScheduleInterviewRepository();
