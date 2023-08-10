const db = require("../config/connect");

var products = [];

module.exports = class Product {
  constructor() {}
  //thêm một sản phẩm
  static addProduct(nameProduct, priceProduct, sortDescription, images) {
    const sql =
      "INSERT INTO products (nameProduct, priceProduct, sortDescription, images) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [nameProduct, priceProduct, sortDescription, images],
      (err, result) => {
        if (err) throw err;
        console.log("New product has been added:", result);
      }
    );
  }
  //trả về tất cả sản phẩm
  static fetchAll() {
    let sql = `SELECT * FROM products`;
    db.query(sql, function (err, data) {
      if (err) throw err;
      products = data;
    });
    return products;
  }
  // lấy theo id
  static findById(id) {
    let sql = `SELECT * FROM products WHERE idProduct = ?`;
    db.query(sql, [id], function (err, data) {
      if (err) throw err;
      products = data;
    });
    // console.log(products);
    return products;
  }
  // update 
  static updateProduct(id, nameProduct, priceProduct, sortDescription, images) {
    const sql = `UPDATE products SET nameProduct=?, priceProduct=?, sortDescription=?, images=? WHERE idProduct=?`;
    db.query(
      sql,
      [nameProduct, priceProduct, sortDescription, images, id],
      (err, result) => {
        if (err) throw err;
        console.log(`Đã Update :  ${result.affectedRows}`);
      }
    );
  }
  //delete

  static deleteById(id) {
    const sql = "DELETE FROM products WHERE idProduct = ?";
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      console.log(`Đã Delete :  ${result.affectedRows}`);
    });
  }
};
