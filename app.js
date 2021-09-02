var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
let validateInput = require('./util/validator');
var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));




app.use('/api/getData', validateInput, indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send({code:404,msg:"Service Not found",records:[]})
  // next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send({code:err.status || 500,msg:"Service Not found",records:[]});

});

module.exports = app;