import { Router } from 'express';
import * as loginService from '../services/loginService';
import { tokenValidator } from "../validators/loginValidator";

const router = Router();


/**
 * POST /api/users
 */
router.delete('/', tokenValidator, (req, res, next) => {

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
