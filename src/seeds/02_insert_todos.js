/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('todos')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('todos').insert({
          description: 'Create multiple users todo REST API',
          updated_at: new Date(),
          user_id: 1
        }),
        knex('todos').insert({
          description: 'Create multiple users todo REST API',
          updated_at: new Date(),
          user_id: 2
        })
      ]);
    });
}
