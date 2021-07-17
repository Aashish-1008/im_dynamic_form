const Ajv = require("ajv");

const validate = (
  payload,
  schemaFilePath = "../app_data/ProductFormSchema.json"
) => {
  const ajv = new Ajv(),
    schema = require(schemaFilePath);

  const validate = ajv.compile(schema);
  const valid = validate(payload);

  return {
    isValid: valid,
    error: validate.errors,
  };
};

module.exports = validate;
