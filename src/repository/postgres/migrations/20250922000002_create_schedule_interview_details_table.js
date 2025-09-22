/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('schedule_interview_details', function (table) {
    table.uuid('schedule_interview_details_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('schedule_interview_id').notNullable();
    table.uuid('employee_id').notNullable();
    table.timestamp('create_at').defaultTo(knex.fn.now()).notNullable();
    table.string('create_by', 255).nullable();
    table.timestamp('update_at').defaultTo(knex.fn.now()).notNullable();
    table.string('update_by', 255).nullable();
    table.timestamp('delete_at').nullable();
    table.string('delete_by', 255).nullable();
    table.boolean('is_delete').defaultTo(false).notNullable();

    // Foreign key constraints
    table.foreign('schedule_interview_id').references('schedule_interview_id').inTable('schedule_interview').onDelete('CASCADE');
    table.foreign('employee_id').references('employee_id').inTable('employees').onDelete('CASCADE');
    
    // Index untuk performance
    table.index(['schedule_interview_id']);
    table.index(['employee_id']);
    table.index(['is_delete']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('schedule_interview_details');
};
