const express = require("express"),
  router = express.Router(),
  FormController = require("../controllers/FormController");

router.get("/:form_type", FormController.get);

module.exports = router;
