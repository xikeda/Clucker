/* Use Knex to a create table to hold clucks, Cluckr's equivalent of tweets. Clucks should have the following fields:

// A username
// An image_path
// A content
// A self-increment unique id
// created_at and updated_at timestamps
*/

exports.up = function(knex, Promise) {
  return knex.schema.createTable('cluck', (table) => {
    table.increments();
    table.text('username').notNullable();
    table.string('image_path');
    table.text('content').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cluck ');
};
