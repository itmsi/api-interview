/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('employees', (table) => {
    table.uuid('employee_id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('employee_name', 100).notNullable();
    table.string('employee_email', 100).notNullable();
    table.uuid('title_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('created_by').nullable();
    table.timestamp('updated_at').nullable();
    table.uuid('updated_by').nullable();
    table.timestamp('deleted_at').nullable();
    table.uuid('deleted_by').nullable();
    table.boolean('is_delete').defaultTo(false);
    table.uuid('gender_id').nullable();
    table.uuid('department_id').nullable();
    table.string('employee_mobile', 50).nullable();
    table.string('employee_office_number', 50).nullable();
    table.text('employee_address').nullable();
    table.string('employee_exmail_account', 100).nullable();
    table.string('employee_channel', 100).nullable();
    table.string('employee_activation_status', 50).nullable();
    table.boolean('employee_disabled').defaultTo(false);
    table.string('employee_wechat_workplace', 100).nullable();
    table.uuid('island_id').nullable();
    table.string('employee_phone', 50).nullable();
    
    // Foreign key constraints
    table.foreign('title_id').references('title_id').inTable('titles').onDelete('CASCADE');
    table.foreign('department_id').references('department_id').inTable('departments');
    table.foreign('gender_id').references('gender_id').inTable('genders');
    table.foreign('island_id').references('island_id').inTable('islands');
    
    // Indexes for better performance
    table.index(['employee_name']);
    table.index(['employee_email']);
    table.index(['title_id']);
    table.index(['department_id']);
    table.index(['gender_id']);
    table.index(['island_id']);
    table.index(['is_delete']);
    table.index(['employee_disabled']);
    table.index(['created_at']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('employees');
};
