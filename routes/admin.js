const express = require("express");
const productsController = require("../controllers/products");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/product");

// /admin/ => GET
router.get("/list-product", productsController.getProducts);
// /admin/add-product => GET
router.get("/add-product", productsController.getAddProduct);
// /admin/add-product => POST
const storageNew = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadNew = multer({ storage: storageNew });
router.post(
  "/add-product",
  uploadNew.single("productImage"),
  productsController.postAddProduct
);

// /admin/edit-product => GET
router.get("/edit-product/:id", productsController.getEditProduct);
// /admin/update-product => POST
const storageEdit = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadEdit = multer({ storage: storageEdit });
router.post(
  "/update-product/:id",
  uploadEdit.single("productImage"),
  productsController.postUpdateProduct
);
// /admin/delete-product => POST

router.post("/delete-product/:id", (req, res) => {
  const productId = req.params.id;
  Product.deleteById(productId);
  res.redirect("/admin/list-product");
});

module.exports = router;
