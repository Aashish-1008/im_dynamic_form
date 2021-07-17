var Promise = require("bluebird"),
  debug = require("debug")("form-controller"),
  _ = require("lodash"),
  ApiError = require("../framework/apiError"),
  formData = require("../app_data/ProductFormSchema.json");

/**
 * FormController module.
 * @module controller/FormController
 */
var FormController = (module.exports = {
  get: get,
});

/**
 * get   get the form
 * @param  object   req  incoming request object
 * @param  object      res  http response object
 */
function get(req, res, next) {
  res.send(formData);
}
