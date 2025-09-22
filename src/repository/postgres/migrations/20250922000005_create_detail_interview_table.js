/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('detail_interview', function (table) {
    table.uuid('detail_interview_id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('interview_id').notNullable();
    table.string('aspect', 255).nullable();
    table.text('question').nullable();
    table.text('answer').nullable();
    table.integer('score').defaultTo(0).notNullable();
    table.timestamp('create_at').defaultTo(knex.fn.now()).notNullable();
    table.string('create_by', 255).nullable();
    table.timestamp('update_at').defaultTo(knex.fn.now()).notNullable();
    table.string('update_by', 255).nullable();
    table.timestamp('delete_at').nullable();
    table.string('delete_by', 255).nullable();
    table.boolean('is_delete').defaultTo(false).notNullable();

    // Foreign key constraint
    table.foreign('interview_id')
      .references('interview_id')
      .inTable('interview')
      .onDelete('CASCADE');
    
    // Index untuk performance
    table.index(['interview_id']);
    table.index(['aspect']);
    table.index(['score']);
    table.index(['is_delete']);
    table.index(['create_at']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('detail_interview');
};
