const express = require("express");
var bodyParser = require("body-parser");
const multer = require("multer");
const adminRoutes = require("./routes/admin");
const shopRoutes = require('./routes/shop');
                                                  

const connection = require('./config/connect');
const session = require('express-session');
var path = require('path');
const app = express();
const port = 3;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// khai bao sử dụng template ejs
app.set("view engine", "ejs");
app.set("views", "./views")
app.use(express.static("public"));
app.use("/admin", adminRoutes);
app.use("/",shopRoutes);
const mysql = require('mysql');
// Khai báo cấu hình session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Khai báo middleware để parse request body
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
// Khai báo các route
app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/file/login.html');
});
// Đăng nhập
app.post('/auth', function(request, response) {
  const username = request.body.username;
  const password = request.body.password;

  if (username && password) {
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        response.redirect('/home');
      } else {
        response.send('Sai tài khoản hoặc mật khẩu!');
      }
      response.end();
    });
  } else {
    response.send('Vui lòng nhập tài khoản và mật khẩu!');
    response.end();
  }
});
// Khai báo các route
app.get('/register', function(req, res) {
  res.sendFile(__dirname + '/file/dk.html');
});
// Đăng ký
app.post('/register', function(request, response) {
  const username = request.body.username;
  const password = request.body.password;
  const email = request.body.email;

  if (username && password && email) {
    connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], function(error, results, fields) {
      if (error) throw error;
      response.send('Đăng ký thành công!');
      response.end();
    });
  } else {
    response.send('Vui lòng nhập đầy đủ thông tin!');
    response.end();
  }
});

// Trang chủ
app.get('/admin/list-product', function(request, response) {
  if (request.session.loggedin) {
    response.send('Xin chào, ' + request.session.username + '!');
  } else {
    response.send('Vui lòng đăng nhập để tiếp tục!');
  }
  response.end();
});
// admin
app.get('/admin', function(request, response) {
	response.sendFile(path.join(__dirname + '/file/admin.html'));
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('');
			} else {
				response.send('Tên Người Dùng Và Mật Khẩu Không Chính Xác !');
			}			
			response.end();
		});n
	} else {
		response.send('Vui Lòng Nhập Tên Người Dùng Và Mật Khẩu');
		response.end();
	}
});




// Khởi động server
app.listen(3000, function() {
  console.log('Server đang chạy tại cổng 3000!');
});

