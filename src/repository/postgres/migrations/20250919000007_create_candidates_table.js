/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('candidates', (table) => {
    table.uuid('candidate_id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('candidate_name').nullable();
    table.string('candidate_email').nullable();
    table.string('candidate_phone').nullable();
    table.string('candidate_religion').nullable();
    table.string('candidate_marital_status').nullable();
    table.integer('candidate_age').nullable();
    table.date('candidate_date_birth').nullable();
    table.string('candidate_nationality').nullable();
    table.string('candidate_city').nullable();
    table.string('candidate_state').nullable();
    table.string('candidate_country').nullable();
    table.text('candidate_address').nullable();
    table.string('candidate_foto').nullable();
    table.string('candidate_resume').nullable();
    table.timestamp('create_at').defaultTo(knex.fn.now()).notNullable();
    table.string('create_by').nullable();
    table.timestamp('update_at').defaultTo(knex.fn.now()).notNullable();
    table.string('update_by').nullable();
    table.timestamp('delete_at').nullable();
    table.string('delete_by').nullable();
    table.boolean('is_delete').defaultTo(false).nullable();
    table.string('candidate_number').nullable();
    table.uuid('company_id').nullable();
    table.uuid('departement_id').nullable();
    table.uuid('title_id').nullable();
    table.uuid('gender_id').nullable();
    
    // Foreign key constraints
    table.foreign('company_id').references('company_id').inTable('companies');
    table.foreign('departement_id').references('department_id').inTable('departments');
    table.foreign('title_id').references('title_id').inTable('titles');
    table.foreign('gender_id').references('gender_id').inTable('genders');
    
    // Indexes for better performance
    table.index(['candidate_name']);
    table.index(['candidate_email']);
    table.index(['candidate_phone']);
    table.index(['candidate_number']);
    table.index(['company_id']);
    table.index(['departement_id']);
    table.index(['title_id']);
    table.index(['gender_id']);
    table.index(['create_at']);
    table.index(['delete_at']);
    table.index(['is_delete']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('candidates');
};
