var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require("mysql");
var session = require("express-session");
var {sendResponse} = require('./commonFunction/commonFunction')
var con = mysql.createConnection({
  host : "localhost",
  user:"root",
  password :"",
  database:"blogManagement"
});
con.connect((error)=>{
  try {
    if(error) throw error;
    console.log("connected!!!")
  } catch (error) {
    console.log("Database not Connected")
  }

});
//setting global connection
global.con = con;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/posts');

var app = express();

// view engine setup
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({secret:"bloging",resave:false,saveUninitialized:true}))

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/post', postRouter);

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
  // res.status(err.status || 500);
  const data ={
    page : "error",
    pageTitle : "No Page Found"

  }
  return sendResponse(req,res,data)
});

module.exports = app;
