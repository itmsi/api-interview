/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('work_experience', (table) => {
    table.uuid('work_experience_id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.uuid('applicate_id').notNullable();
    table.string('company_name').nullable();
    table.date('start_date_of_work').nullable();
    table.date('end_date_of_work').nullable();
    table.string('pay_per_month').nullable();
    table.string('name_of_supervisor').nullable();
    table.text('reason_for_leaving').nullable();
    table.timestamp('create_at').defaultTo(knex.fn.now()).notNullable();
    table.string('create_by').nullable();
    table.timestamp('update_at').defaultTo(knex.fn.now()).notNullable();
    table.string('update_by').nullable();
    table.timestamp('delete_at').nullable();
    table.string('delete_by').nullable();
    table.boolean('is_delete').defaultTo(false).notNullable();
    
    // Foreign key constraint
    table.foreign('applicate_id').references('applicate_id').inTable('applicant_information').onDelete('CASCADE');
    
    // Indexes for better performance
    table.index(['applicate_id']);
    table.index(['company_name']);
    table.index(['start_date_of_work']);
    table.index(['end_date_of_work']);
    table.index(['create_at']);
    table.index(['is_delete']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('work_experience');
};
