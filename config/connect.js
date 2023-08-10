const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lab4",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Đã kết nối cơ sở dữ liệu thành công !");
});

module.exports = db;
