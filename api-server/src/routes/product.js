const express = require("express"),
  router = express.Router(),
  ProductController = require("../controllers/ProductController");

router.post("/product", ProductController.add);
router.put("/products/:product_id", ProductController.update);
router.get("/products", ProductController.getAll);
router.delete("/products/:product_id", ProductController.deleteProduct);

module.exports = router;
