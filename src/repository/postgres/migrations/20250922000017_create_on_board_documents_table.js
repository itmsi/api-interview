exports.up = function(knex) {
  return knex.schema.createTable('on_board_documents', function(table) {
    table.uuid('on_board_documents_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('candidate_id').notNullable();
    table.string('on_board_documents_name', 255).nullable();
    table.string('on_board_documents_file', 500).nullable();
    table.timestamp('create_at').defaultTo(knex.fn.now()).notNullable();
    table.string('create_by', 255).nullable();
    table.timestamp('update_at').defaultTo(knex.fn.now()).notNullable();
    table.string('update_by', 255).nullable();
    table.timestamp('delete_at').nullable();
    table.string('delete_by', 255).nullable();
    
    // Foreign key constraint
    table.foreign('candidate_id').references('candidate_id').inTable('candidates').onDelete('CASCADE');
    
    // Indexes for better performance
    table.index('candidate_id');
    table.index('create_at');
    table.index('delete_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('on_board_documents');
};
