/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('notes', (table) => {
    table.uuid('note_id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.uuid('candidate_id').notNullable();
    table.text('notes').notNullable();
    table.timestamp('create_at').defaultTo(knex.fn.now()).notNullable();
    table.string('create_by').nullable();
    table.timestamp('update_at').defaultTo(knex.fn.now()).notNullable();
    table.string('update_by').nullable();
    table.timestamp('delete_at').nullable();
    table.string('delete_by').nullable();
    table.boolean('is_delete').defaultTo(false).notNullable();
    table.string('create_role').nullable();
    table.uuid('employee_id').nullable();
    
    // Foreign key constraints
    table.foreign('candidate_id').references('candidate_id').inTable('candidates').onDelete('CASCADE').onUpdate('CASCADE');
    table.foreign('employee_id').references('employee_id').inTable('employees');
    
    // Indexes for better performance
    table.index(['candidate_id']);
    table.index(['employee_id']);
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
  return knex.schema.dropTable('notes');
};
