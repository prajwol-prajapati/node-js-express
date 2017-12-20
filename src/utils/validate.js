import Joi from 'joi';

/**
 * Utility helper for Joi validation.
 *
 * @param  {object}  data
 * @param  {object}  schema
 * @return {Promise}
 */
function validate(data, schema) {
  return Joi.validate(data, schema, { abortEarly: false }, err => {
    console.log('-----------------------hello from token validate part');

    if (err) {
      console.log('-----------------------hello from token validate part error');

      return Promise.reject(err);
    }
    console.log('-----------------------hello from token validate part success');

    return Promise.resolve(null);
  });
}

export default validate;
