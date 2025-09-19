/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('companies', (table) => {
    table.uuid('company_id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('company_name', 100).notNullable();
    table.uuid('company_parent_id').nullable();
    table.text('company_address').nullable();
    table.string('company_email', 100).nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').nullable();
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    
    // Foreign key constraint - self reference
    table.foreign('company_parent_id').references('company_id').inTable('companies');
    
    // Indexes for better performance
    table.index(['company_name']);
    table.index(['is_delete']);
    table.index(['created_at']);
    table.index(['company_parent_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('companies');
};
