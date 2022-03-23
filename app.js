var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const jwtMiddleware = require("./module/jwtMiddleware");

var fs = require("fs");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwtMiddleware);
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get("/image/:path", async (req, res) => {
  const {path} = req.params;
  await fs.exists("./image/"+path, (exists) => {
    if (exists) {
      fs.readFile("./image/"+path, (error, data) => {
        res.writeHead(200, { 'Content-Type' : 'text/html' });
        res.end(data);
      });
    }
    else {
      fs.readFile("./image/대문로고.jpg", (error, data) => {
        res.writeHead(200, { 'Content-Type' : 'text/html' });
        res.end(data);
      });
    }
  });
  
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
