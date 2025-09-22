const knex = require('../../knexfile');
const db = require('knex')(knex[process.env.NODE_ENV || 'development']);
const { 
  buildCountQuery, 
  applyStandardFilters, 
  formatPaginatedResponse 
} = require('../../utils/standard_query');

class ApplicantRepository {
  // Main applicant information methods
  async create(applicantData, relatedData = {}) {
    const trx = await db.transaction();
    
    try {
      // Insert main applicant information
      const [applicant] = await trx('applicant_information')
        .insert(applicantData)
        .returning('*');

      const applicateId = applicant.applicate_id;

      // Insert education backgrounds
      if (relatedData.education_backgrounds && relatedData.education_backgrounds.length > 0) {
        const educationData = relatedData.education_backgrounds.map(edu => ({
          ...edu,
          applicate_id: applicateId,
          create_by: applicantData.create_by
        }));
        await trx('education_background').insert(educationData);
      }

      // Insert informal education qualifications
      if (relatedData.informal_education_qualifications && relatedData.informal_education_qualifications.length > 0) {
        const informalEducationData = relatedData.informal_education_qualifications.map(edu => ({
          ...edu,
          applicate_id: applicateId,
          create_by: applicantData.create_by
        }));
        await trx('informal_education_qualification').insert(informalEducationData);
      }

      // Insert family backgrounds
      if (relatedData.family_backgrounds && relatedData.family_backgrounds.length > 0) {
        const familyData = relatedData.family_backgrounds.map(family => ({
          ...family,
          applicate_id: applicateId,
          create_by: applicantData.create_by
        }));
        await trx('family_background').insert(familyData);
      }

      // Insert work experiences
      if (relatedData.work_experiences && relatedData.work_experiences.length > 0) {
        const workData = relatedData.work_experiences.map(work => ({
          ...work,
          applicate_id: applicateId,
          create_by: applicantData.create_by
        }));
        await trx('work_experience').insert(workData);
      }

      // Insert references
      if (relatedData.references && relatedData.references.length > 0) {
        const referenceData = relatedData.references.map(ref => ({
          ...ref,
          applicate_id: applicateId,
          create_by: applicantData.create_by
        }));
        await trx('reference').insert(referenceData);
      }

      await trx.commit();
      return applicant;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async findById(id) {
    const applicant = await db('applicant_information')
      .where('applicate_id', id)
      .where('is_delete', false)
      .first();
    return applicant;
  }

  async findByIdWithRelations(id) {
    const applicant = await this.findById(id);
    if (!applicant) return null;

    // Get related data
    const [
      educationBackgrounds,
      informalEducationQualifications,
      familyBackgrounds,
      workExperiences,
      references
    ] = await Promise.all([
      this.getEducationBackgroundsByApplicantId(id),
      this.getInformalEducationQualificationsByApplicantId(id),
      this.getFamilyBackgroundsByApplicantId(id),
      this.getWorkExperiencesByApplicantId(id),
      this.getReferencesByApplicantId(id)
    ]);

    return {
      ...applicant,
      education_backgrounds: educationBackgrounds,
      informal_education_qualifications: informalEducationQualifications,
      family_backgrounds: familyBackgrounds,
      work_experiences: workExperiences,
      references: references
    };
  }

  async update(id, applicantData, relatedData = {}) {
    const trx = await db.transaction();
    
    try {
      // Update main applicant information
      const [applicant] = await trx('applicant_information')
        .where('applicate_id', id)
        .where('is_delete', false)
        .update({
          ...applicantData,
          update_at: trx.fn.now()
        })
        .returning('*');

      if (!applicant) {
        await trx.rollback();
        return null;
      }

      // Update education backgrounds (delete old ones and insert new ones)
      if (relatedData.education_backgrounds !== undefined) {
        await trx('education_background')
          .where('applicate_id', id)
          .update({ is_delete: true, delete_at: trx.fn.now(), delete_by: applicantData.update_by });
        
        if (relatedData.education_backgrounds.length > 0) {
          const educationData = relatedData.education_backgrounds.map(edu => ({
            ...edu,
            applicate_id: id,
            create_by: applicantData.update_by
          }));
          await trx('education_background').insert(educationData);
        }
      }

      // Update informal education qualifications
      if (relatedData.informal_education_qualifications !== undefined) {
        await trx('informal_education_qualification')
          .where('applicate_id', id)
          .update({ is_delete: true, delete_at: trx.fn.now(), delete_by: applicantData.update_by });
        
        if (relatedData.informal_education_qualifications.length > 0) {
          const informalEducationData = relatedData.informal_education_qualifications.map(edu => ({
            ...edu,
            applicate_id: id,
            create_by: applicantData.update_by
          }));
          await trx('informal_education_qualification').insert(informalEducationData);
        }
      }

      // Update family backgrounds
      if (relatedData.family_backgrounds !== undefined) {
        await trx('family_background')
          .where('applicate_id', id)
          .update({ is_delete: true, delete_at: trx.fn.now(), delete_by: applicantData.update_by });
        
        if (relatedData.family_backgrounds.length > 0) {
          const familyData = relatedData.family_backgrounds.map(family => ({
            ...family,
            applicate_id: id,
            create_by: applicantData.update_by
          }));
          await trx('family_background').insert(familyData);
        }
      }

      // Update work experiences
      if (relatedData.work_experiences !== undefined) {
        await trx('work_experience')
          .where('applicate_id', id)
          .update({ is_delete: true, delete_at: trx.fn.now(), delete_by: applicantData.update_by });
        
        if (relatedData.work_experiences.length > 0) {
          const workData = relatedData.work_experiences.map(work => ({
            ...work,
            applicate_id: id,
            create_by: applicantData.update_by
          }));
          await trx('work_experience').insert(workData);
        }
      }

      // Update references
      if (relatedData.references !== undefined) {
        await trx('reference')
          .where('applicate_id', id)
          .update({ is_delete: true, delete_at: trx.fn.now(), delete_by: applicantData.update_by });
        
        if (relatedData.references.length > 0) {
          const referenceData = relatedData.references.map(ref => ({
            ...ref,
            applicate_id: id,
            create_by: applicantData.update_by
          }));
          await trx('reference').insert(referenceData);
        }
      }

      await trx.commit();
      return applicant;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async softDelete(id, deletedBy) {
    const trx = await db.transaction();
    
    try {
      // Soft delete main applicant
      const [applicant] = await trx('applicant_information')
        .where('applicate_id', id)
        .where('is_delete', false)
        .update({
          is_delete: true,
          delete_at: trx.fn.now(),
          delete_by: deletedBy
        })
        .returning('*');

      if (applicant) {
        // Soft delete all related records
        await Promise.all([
          trx('education_background').where('applicate_id', id).update({ is_delete: true, delete_at: trx.fn.now(), delete_by: deletedBy }),
          trx('informal_education_qualification').where('applicate_id', id).update({ is_delete: true, delete_at: trx.fn.now(), delete_by: deletedBy }),
          trx('family_background').where('applicate_id', id).update({ is_delete: true, delete_at: trx.fn.now(), delete_by: deletedBy }),
          trx('work_experience').where('applicate_id', id).update({ is_delete: true, delete_at: trx.fn.now(), delete_by: deletedBy }),
          trx('reference').where('applicate_id', id).update({ is_delete: true, delete_at: trx.fn.now(), delete_by: deletedBy })
        ]);
      }

      await trx.commit();
      return applicant;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  /**
   * Find applicants dengan filter standar (pagination, sorting, searching, filtering)
   * @param {Object} queryParams - Parsed query parameters dari parseStandardQuery
   * @returns {Object} Paginated response dengan data dan metadata
   */
  async findWithFilters(queryParams) {
    // Base query untuk data
    const baseQuery = db('applicant_information')
      .select('applicant_information.*')
      .where('applicant_information.is_delete', false);

    // Query untuk count total records
    const countBaseQuery = db('applicant_information')
      .where('applicant_information.is_delete', false);
    const countQuery = buildCountQuery(countBaseQuery, queryParams);
    const [{ count }] = await countQuery.count('applicant_information.applicate_id as count');
    const total = parseInt(count);

    // Apply filters dan pagination ke base query
    const dataQuery = applyStandardFilters(baseQuery.clone(), queryParams);
    const data = await dataQuery;

    // Format response dengan pagination metadata
    return formatPaginatedResponse(data, queryParams.pagination, total);
  }

  // Related data methods
  async getEducationBackgroundsByApplicantId(applicantId) {
    return await db('education_background')
      .where('applicate_id', applicantId)
      .where('is_delete', false)
      .orderBy('create_at', 'desc');
  }

  async getInformalEducationQualificationsByApplicantId(applicantId) {
    return await db('informal_education_qualification')
      .where('applicate_id', applicantId)
      .where('is_delete', false)
      .orderBy('create_at', 'desc');
  }

  async getFamilyBackgroundsByApplicantId(applicantId) {
    return await db('family_background')
      .where('applicate_id', applicantId)
      .where('is_delete', false)
      .orderBy('create_at', 'desc');
  }

  async getWorkExperiencesByApplicantId(applicantId) {
    return await db('work_experience')
      .where('applicate_id', applicantId)
      .where('is_delete', false)
      .orderBy('start_date_of_work', 'desc');
  }

  async getReferencesByApplicantId(applicantId) {
    return await db('reference')
      .where('applicate_id', applicantId)
      .where('is_delete', false)
      .orderBy('create_at', 'desc');
  }

  async count(filters = {}) {
    let query = db('applicant_information')
      .where('is_delete', false);

    // Apply filters
    if (filters.search) {
      query = query.where(function() {
        this.where('first_name', 'ilike', `%${filters.search}%`)
          .orWhere('middle_name', 'ilike', `%${filters.search}%`)
          .orWhere('last_name', 'ilike', `%${filters.search}%`)
          .orWhere('email', 'ilike', `%${filters.search}%`)
          .orWhere('mobile', 'ilike', `%${filters.search}%`)
          .orWhere('position_applied_for', 'ilike', `%${filters.search}%`);
      });
    }

    const result = await query.count('applicate_id as count').first();
    return parseInt(result.count);
  }
}

module.exports = new ApplicantRepository();
