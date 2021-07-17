const BASE_URL = "http://localhost:8080";

let ADD_PRODUCT_URL = BASE_URL + "/api/product",
  GET_ALL_PRODUCTS_URL = BASE_URL + "/api/products",
  DELETE_PRODUCT_URL = BASE_URL + "/api/products/:product_id",
  EDIT_PRODUCT_URL = BASE_URL + "/api/products/:product_id",
  PRODUCT_FORM_SCHEMA_URL = BASE_URL + "/api/forms/product";

const fetchItems = () => {
  return new Promise(function (resolve, reject) {
    fetch(GET_ALL_PRODUCTS_URL)
      .then((response) => response.json())
      .then((productItems) => {
        return resolve(productItems);
      })
      .catch((err) => {
        return reject("Not able to fetch the products");
      });
  });
};

const addItem = (d) => {
  return new Promise(function (resolve, reject) {
    fetch(ADD_PRODUCT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    })
      .then((response) => response.json())
      .then((productItem) => {
        return resolve(fetchItems());
      })
      .catch((error) => {
        return reject("Not able to add the product");
      });
  });
};

const editItem = (product_id, d) => {
  return new Promise(function (resolve, reject) {
    fetch(EDIT_PRODUCT_URL.replace(":product_id", product_id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    })
      .then((response) => response.json())
      .then((data) => {
        return resolve(fetchItems());
      })
      .catch((error) => {
        return reject("Not able to edit the product");
      });
  });
};

const removeItem = (productId) => {
  return new Promise(function (resolve, reject) {
    fetch(DELETE_PRODUCT_URL.replace(":product_id", productId), {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        return resolve(fetchItems());
      })
      .catch((error) => {
        return reject("Not able to remove the products");
      });
  });
};

const fetchProductItemFormSchema = () => {
  return new Promise(function (resolve, reject) {
    fetch(PRODUCT_FORM_SCHEMA_URL)
      .then((response) => response.json())
      .then((productFormSchema) => {
        return resolve(productFormSchema);
      })
      .catch((err) => {
        return reject("Not able to get the form schema.");
      });
  });
};

export {
  fetchItems,
  addItem,
  removeItem,
  fetchProductItemFormSchema,
  editItem,
};
