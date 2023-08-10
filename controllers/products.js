const Product = require("../models/product");

const products = [];
exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
  });
};
exports.postAddProduct = (req, res, next) => {
  const nameProduct = req.body.productName;
  const priceProduct = req.body.price;
  const sortDescription = req.body.description;
  const file = req.file;
  let imageUrl = "";
  if (file) {
    imageUrl = file.filename;
  }

  Product.addProduct(nameProduct, priceProduct, sortDescription, imageUrl);
  res.redirect("/home");
};

// get home
exports.getHome = (req, res, next) => {
  const products = Product.fetchAll();
  // console.log(products);
  res.render("home", {
    hung: products,
    pageTitle: "Home",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
  });
};

// get admin product
exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render("list-product", {
    prods: products,
    pageTitle: "List Product",
    path: "/admin/list-product",
    activeShop: true,
  });
};
// show edit
exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const products = Product.findById(prodId);
  // console.log(products[0]);
  res.render("edit-product", {
    path: "/admin/edit-product/:id",
    dataProduct: products[0],
    pageTitle: "Edit Product",
    activeShop: true,
  });
};
// update
exports.postUpdateProduct = (req, res, next) => {
  console.log(req.body);
  const productId = req.params.id;
  const file = req.file;
  const nameProduct = req.body.productName;
  const priceProduct = req.body.price;
  const sortDescription = req.body.description;
  let imageUrl = "";
  if (file) {
    imageUrl = file.filename;
  }
  Product.updateProduct(
    productId,
    nameProduct,
    priceProduct,
    sortDescription,
    imageUrl
  );
  res.redirect("/admin/list-product");
};
