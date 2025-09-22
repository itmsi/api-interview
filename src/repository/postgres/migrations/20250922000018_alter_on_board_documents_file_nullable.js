exports.up = function(knex) {
  return knex.schema.alterTable('on_board_documents', function(table) {
    table.string('on_board_documents_file', 500).nullable().alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('on_board_documents', function(table) {
    table.string('on_board_documents_file', 500).notNullable().alter();
  });
};
