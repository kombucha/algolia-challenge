var Ajv = require("ajv");

/**
 * Validates a model against a JSON Schema.
 * @param {object} [schema] A JSON schema object
 * @param {object} [model] The model to be validated
 * @returns {array|null} An array of errors, or null if no errors were found
 */
function validateModel(schema, model) {
  var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
  var validate = ajv.compile(schema);
  validate(model);
  return validate.errors;
}

module.exports = {
  validateModel: validateModel,
};
