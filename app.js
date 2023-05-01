var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dotenv = require('dotenv');
dotenv.config();

const mariadb = require('mariadb/callback');
const db = mariadb.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

// connect to database
db.connect((err) => {
if (err) {
console.log("Unable to connect to database due to error: " + err);
} else {
console.log("Connected to DB");
}
});

global.db = db;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactRouter = require('./routes/contact')
var aboutRouter = require('./routes/about')
var helpRouter = require('./routes/help')
var gigRouter = require('./routes/gigs')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middlewear for handling routes, gets passed the routerOBJ for each view file and checks its module export for the corresponding path and calls the correct routeer handler to render content
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter)
app.use('/help', helpRouter)
app.use('/gigs', gigRouter)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.stack = err.stack
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.locals.errcode = "404"

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
