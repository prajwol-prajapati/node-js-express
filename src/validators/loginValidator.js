import Joi from 'joi';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Boom from 'boom';

import validate from '../utils/validate';

const SCHEMA = {
  email:Joi.string()
    .label('email')
    .required(),
  password:Joi.string()
    .label('password')
    .required()
};
//
// const TOKEN = {
//   access_token: Joi.string()
//     .label('access_token')
//     .required()
// };

/**
 * Validate create/update login request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function loginValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

function tokenValidator(req, res, next) {
  console.log('inside the catch error');

  try{
    let decoded =  jwt.decode(req.headers.access_token, 'hello');
    console.log(decoded);
    console.log(decoded.userId);
    let userId = decoded.userId;
    new User({ 'id': userId}).fetch().then(user => {
      if(!user){
        throw new Boom.forbidden('user id doesnot exist');
      }else{
        console.log(user);

        next();
      }
    });

  }catch (e) {
    console.log('inside the catch error');
    throw new Boom.unauthorized('unauthorized access. no access token');
    next();
  }

  // return (() => {
  //     console.log('-----------------------hello from token validator');
  //     jwt.verify(req.header.access_token, 'hello');
  //     next();
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
}

export { loginValidator, tokenValidator};
