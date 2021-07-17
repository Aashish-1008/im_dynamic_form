var Promise = require("bluebird"),
  debug = require("debug")("product-controller"),
  _ = require("lodash"),
  fs = require("fs"),
  shortid = require("shortid"),
  validate = require("../framework/validator"),
  ApiError = require("../framework/apiError");

const PRODUCT_DATA_FILE_PATH = process.cwd() + "/src/app_data/product.json";

/**
 * ProductController module.
 * @module controller/ProductController
 */
module.exports = {
  add: add,
  update: update,
  getAll: getAll,
  deleteProduct: deleteProduct,
};

/**
 * add     add a product
 * @param  object   req  incoming request object
 * @param  object   res  http response object
 */
function add(req, res, next) {
  let productData = req.body;

  let validationObj = validate(productData);

  // 1. validate the incoming product data
  if (!validationObj["isValid"]) {
    throw new ApiError.BadRequest(validationObj["error"]);
  }

  getProducts()
    .then((products) => {
      productData["product_id"] = shortid.generate();
      products.push(productData);

      // 2. Save the product in local json file
      return saveProduct(products);
    })
    .then(function (product) {
      res.send(productData);
    })
    .catch(next);
}

/**
 * update     update a product
 * @param  object   req  incoming request object
 * @param  object   res  http response object
 */
function update(req, res, next) {
  let productData = req.body,
    params = req.params;

  let validationObj = validate(productData);

  // 1. validate the incoming product data
  if (!validationObj["isValid"]) {
    throw new ApiError.BadRequest(validationObj["error"]);
  }

  getProducts()
    .then(function (products) {
      let product = _.find(products, function (p) {
        return p["product_id"] == params["product_id"];
      });

      if (_.isEmpty(product))
        throw new ApiError.NotFound(
          `Product with product_id ${params["product_id"]} doesn't exist`
        );

      products = products.map((p) =>
        p["product_id"] === params["product_id"] ? { ...p, ...productData } : p
      );
      return saveProduct(products); // 2. update the product in local json file
    })
    .then(function (products) {
      res.send(productData);
    })
    .catch(next);
}

/**
 * deleteProduct     delete a product
 * @param  object   req  incoming request object
 * @param  object   res  http response object
 */
function deleteProduct(req, res, next) {
  let params = req.params;

  getProducts()
    .then(function (products) {
      let product = _.find(products, function (p) {
        return p["product_id"] == params["product_id"];
      });

      if (_.isEmpty(product))
        throw new ApiError.NotFound(
          `Product with product_id ${params["product_id"]} doesn't exist`
        );

      products = products.filter(
        (p) => p["product_id"] !== params["product_id"]
      );
      return saveProduct(products); // 2. update the product in local json file
    })
    .then(function (products) {
      res.send({
        status: true,
        message: "Product deleted successfully.",
      });
    })
    .catch(next);
}

/**
 * getAll     get all added products
 * @param  object   req  incoming request object
 * @param  object   res  http response object
 */
function getAll(req, res, next) {
  console.log("Request received....");
  getProducts()
    .then((products) => res.send(products.reverse()))
    .catch(next);
}

function saveProduct(products) {
  return new Promise(function (resolve, reject) {
    console.log(products);
    fs.writeFile(
      PRODUCT_DATA_FILE_PATH,
      JSON.stringify(products),
      "utf8",
      (err) => {
        if (err) return reject(err);
        return resolve(products);
      }
    );
  });
}

function getProducts() {
  return new Promise(function (resolve, reject) {
    fs.readFile(PRODUCT_DATA_FILE_PATH, "utf8", (err, products) => {
      if (err) return next(err);
      return resolve(JSON.parse(products));
    });
  });
}
