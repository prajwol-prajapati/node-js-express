import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as loginService from '../services/loginService';
import { loginValidator } from '../validators/loginValidator';

const router = Router();


/**
 * POST /api/users
 */
router.post('/', loginValidator, (req, res, next) => {

  loginService
    .checkLogin(req.body)
    .then(data => {
      req.body.myData = data;
      req.body.token = data.token;
      res.json(data);
      next();
    })
    .catch(err => next(err));
}, (req, res, next) => {
  loginService
    .sessionService(req.body)
    .catch(err => next(err));
});


export default router;
