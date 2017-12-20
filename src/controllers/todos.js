import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as todosService from '../services/todosService';
import { findTodos, todosValidator } from '../validators/todosValidator';
import { tokenValidator } from "../validators/loginValidator";

const router = Router();

/**
 * GET /api/todos
 */
router.get('/', (req, res, next) => {

  todosService
    .getTodoList(req)
    .then(data => res.json({ data }))
    .catch(err => next(err));

});

/**
 * GET /api/todos/:id
 */
router.get('/:id', findTodos, (req, res, next) => {
  todosService
    .getTodos(req.params.id, req.body, req.query.search)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/todos
 */
router.post('/', tokenValidator, todosValidator, (req, res, next) => {
  console.log(req.body.userId+"hahahahahahahahahah-----------");
  todosService
    .createTodos(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/users/:id
 */
router.put('/:id', tokenValidator, findTodos, (req, res, next) => {
  todosService
    .updateTodos(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', tokenValidator, findTodos, (req, res, next) => {
  todosService
    .deleteTodos(req.params.id, req.body)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
