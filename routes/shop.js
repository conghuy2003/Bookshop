const express = require("express");
const productsController = require("../controllers/products");
const router = express.Router();

router.get("/home", productsController.getHome);

module.exports = router;
