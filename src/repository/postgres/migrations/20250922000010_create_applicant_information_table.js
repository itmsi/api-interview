/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('applicant_information', (table) => {
    table.uuid('applicate_id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('first_name').nullable();
    table.string('middle_name').nullable();
    table.string('last_name').nullable();
    table.string('mobile').nullable();
    table.string('email').nullable();
    table.string('id_number').nullable();
    table.string('position_applied_for').nullable();
    table.string('expected_salary').nullable();
    table.string('emergency_contact').nullable();
    table.text('present_address').nullable();
    table.string('city').nullable();
    table.date('date_of_birth').nullable();
    table.string('blood_type').nullable();
    table.string('tax_identification_number').nullable();
    table.date('working_available_date').nullable();
    table.string('religion').nullable();
    table.timestamp('create_at').defaultTo(knex.fn.now()).notNullable();
    table.string('create_by').nullable();
    table.timestamp('update_at').defaultTo(knex.fn.now()).notNullable();
    table.string('update_by').nullable();
    table.timestamp('delete_at').nullable();
    table.string('delete_by').nullable();
    table.boolean('is_delete').defaultTo(false).notNullable();
    
    // Indexes for better performance
    table.index(['first_name']);
    table.index(['last_name']);
    table.index(['email']);
    table.index(['mobile']);
    table.index(['id_number']);
    table.index(['position_applied_for']);
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
  return knex.schema.dropTable('applicant_information');
};
