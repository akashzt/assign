var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/user');
//import database
const db=require("./util/db");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', usersRouter);
// Define a route to render your EJS template
app.get('/', (req, res) => {
  res.render('login', { error: null }); 
});
app.get('/register', (req, res) => {
  res.render('register', { error: null }); 
});
app.get('/profile',(req,res)=>{
  res.render('profile', { error: null }); 
})
app.get('/chat',(req,res)=>{
  res.render('chat', { error: null }); 
})
db();

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
