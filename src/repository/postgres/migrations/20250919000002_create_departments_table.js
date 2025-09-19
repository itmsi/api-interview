/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('departments', (table) => {
    table.uuid('department_id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('department_name', 100).notNullable();
    table.uuid('department_parent_id').nullable();
    table.uuid('company_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').nullable();
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    table.string('department_segmentasi', 100).nullable();
    
    // Foreign key constraints
    table.foreign('company_id').references('company_id').inTable('companies').onDelete('CASCADE');
    table.foreign('department_parent_id').references('department_id').inTable('departments');
    
    // Indexes for better performance
    table.index(['department_name']);
    table.index(['company_id']);
    table.index(['department_parent_id']);
    table.index(['is_delete']);
    table.index(['created_at']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('departments');
};
