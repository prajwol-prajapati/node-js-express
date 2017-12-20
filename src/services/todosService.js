import Boom from 'boom';
import Todos from '../models/todos';
// import user from '../models/user';

/**
 * Get all users.
 *
 * @return {Promise}
 */


/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getTodos(id, todos, q) {
  console.log("here")
  return Todos.query((qb) => {
    qb.where({
      user_id: todos.userId,
      id: id
    }).where('description', 'LIKE', '%' + q + '%').orWhere('tag_name', 'LIKE', '%' + q + '%');}).fetch().then(list => {
      if (!list) {
        throw new Boom.notFound("TODO description not found");
      }
      console.log(list)
      return list;
    });

}

export function getTodoList(request) {
  let userId = request.body.userId;
  let promise = Todos.where({ user_id: userId }).fetchPage({
      pageSize: 5,
      page:request.query.page
    });

  return promise.then(todos=>{
    todos.pagination.page = request.query.page;

    let next = todos.pagination.page < todos.pagination.pageCount ? todos.pagination.page + 1 : null;
      let prev =todos.pagination.page > 1 ?todos.pagination.page - 1 : null;
      console.log();

      let current = todos.pagination.page;
      return{
        "Todos":todos.models,
        "metadata": {
          "number of page": todos.pagination.pageCount,
          "nextpage":next,
          "prevpage":prev,
          "currentpage":current,
        }
      }
    }

  );
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createTodos(todos) {
  return new Todos({ description: todos.description, userId: todos.userId, updatedAt: new Date() })
    .save()
    .then(todos => todos.refresh());
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateTodos(id, todos) {
  return new Todos({ id })
    .save({ description: todos.description, userId: todos.userId })
    .then(todos => todos.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteTodos(id, todos) {
  return new Todos({ id })
    .where({ user_id: todos.userId })
    .fetch()
    .then(todos => todos.destroy());
}
