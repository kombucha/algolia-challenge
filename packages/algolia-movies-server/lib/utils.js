const Ajv = require("ajv");

/**
 * Wraps an async route handler.
 * Forwards the error to next when necessary. This way, we can handle all errors
 * in one place
 * @param {function} [routeHandler] An express route handler
 * @returns {function}
 */
const asyncWrapper = routeHandler => (req, res, next) => {
  Promise.resolve(routeHandler(req, res, next)).catch(next);
};

/**
 * Validates a model against a JSON Schema.
 * @param {object} [schema] A JSON schema object
 * @param {object} [model] The model to be validated
 * @returns {array|null} An array of errors, or null if no errors were found
 */
const validateModel = (schema, model) => {
  const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
  const validate = ajv.compile(schema);
  validate(model);
  return validate.errors;
};

/**
 * Formats json schema validation errors to something more palatable
 * @param {Array} [errors] An array of error objects
 * @returns {Array} An array of error messages
 */
const formatValidationErrors = errors => errors.map(err => `${err.dataPath} ${err.message}`);

module.exports = { asyncWrapper, validateModel, formatValidationErrors };
