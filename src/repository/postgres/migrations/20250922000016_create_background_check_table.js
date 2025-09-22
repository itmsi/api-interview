/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('background_check', function(table) {
    table.uuid('background_check_id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.uuid('candidate_id').notNullable();
    table.text('background_check_note').nullable();
    table.timestamp('create_at').defaultTo(knex.fn.now()).notNullable();
    table.string('create_by', 255).nullable();
    table.timestamp('update_at').defaultTo(knex.fn.now()).notNullable();
    table.string('update_by', 255).nullable();
    table.timestamp('delete_at').nullable();
    table.string('delete_by', 255).nullable();
    table.string('file_attachment', 500).nullable();
    table.string('background_check_status', 255).nullable();
    
    // Foreign key constraint
    table.foreign('candidate_id').references('candidate_id').inTable('candidates').onDelete('CASCADE');
    
    // Indexes for better performance
    table.index('candidate_id');
    table.index('background_check_status');
    table.index('create_at');
    table.index('delete_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('background_check');
};
