exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', table => {
    table.increments();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.integer('user_id').references('users.id');
    table.string('description').notNull();

  })
    .createTable('tags', table => {
      table.increments('id').primary();
      table
        .timestamp('created_at')
        .notNull()
        .defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNull();
      table.string('tag_name').notNull();

    })
    .createTable('tags_todos',table => {
      table.increments();
      table
        .timestamp('created_at')
        .notNull()
        .defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNull();
      table.integer('todos_id').references('todos.id');
      table.integer('tag_id').references('tags.id');

    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags_todos')
    .dropTable('tags')
    .dropTable('todos');
};
