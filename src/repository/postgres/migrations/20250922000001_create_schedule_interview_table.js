/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('schedule_interview', function (table) {
    table.uuid('schedule_interview_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('candidate_id').notNullable();
    table.string('assign_role', 255).notNullable();
    table.date('schedule_interview_date').notNullable();
    table.time('schedule_interview_time').notNullable();
    table.string('schedule_interview_duration', 100).notNullable();
    table.timestamp('create_at').defaultTo(knex.fn.now()).notNullable();
    table.string('create_by', 255).nullable();
    table.timestamp('update_at').defaultTo(knex.fn.now()).notNullable();
    table.string('update_by', 255).nullable();
    table.timestamp('delete_at').nullable();
    table.string('delete_by', 255).nullable();
    table.boolean('is_delete').defaultTo(false).notNullable();

    // Foreign key constraint
    table.foreign('candidate_id').references('candidate_id').inTable('candidates').onDelete('CASCADE');
    
    // Index untuk performance
    table.index(['candidate_id']);
    table.index(['schedule_interview_date']);
    table.index(['is_delete']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('schedule_interview');
};
