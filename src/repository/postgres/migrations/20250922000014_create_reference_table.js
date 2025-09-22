/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('reference', (table) => {
    table.uuid('reference_id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.uuid('applicate_id').notNullable();
    table.string('name_of_reference').nullable();
    table.string('position_of_reference').nullable();
    table.string('phone_number_of_reference').nullable();
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
    table.index(['name_of_reference']);
    table.index(['position_of_reference']);
    table.index(['create_at']);
    table.index(['is_delete']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('reference');
};
