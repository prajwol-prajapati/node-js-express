import Joi from 'joi';
import validate from '../utils/validate';
import * as todosService from '../services/todosService';

const SCHEMA = {
  description: Joi.string()
    .label('description')
    .max(90)
    .required(),
  userId: Joi.string()
    .label('userId')
    .required()
};

/**
 * Validate create/update user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function todosValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findTodos(req, res, next) {
  return todosService
    .getTodos(req.params.id, req.body)
    .then(() => next())
    .catch(err => next(err));
}

export { findTodos, todosValidator };
