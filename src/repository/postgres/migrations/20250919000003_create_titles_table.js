/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('titles', (table) => {
    table.uuid('title_id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('title_name', 100).notNullable();
    table.uuid('department_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').nullable();
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Foreign key constraint
    table.foreign('department_id').references('department_id').inTable('departments').onDelete('CASCADE');
    
    // Indexes for better performance
    table.index(['title_name']);
    table.index(['department_id']);
    table.index(['is_delete']);
    table.index(['created_at']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('titles');
};
