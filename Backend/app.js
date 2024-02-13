var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var helmet = require("helmet");
var mongoSanitize = require('express-mongo-sanitize');
var rateLimit = require('express-rate-limit');

var https = require("https");
var http = require("http");
var fs = require("fs");

// CONFIG & DB SETUP
var config = require('./db_details/config');
var dbConfigure = require('./db_details/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(mongoSanitize());

app.use(authLimiter);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var server;
if (process.env.NODE_ENV == "local" || process.env.NODE_ENV === undefined) {
  server = http.createServer(app);
}
else if (process.env.NODE_ENV == "devel" || process.env.NODE_ENV == "prod") {
  var options = {
    key: fs.readFileSync(path.join(__dirname, "/sslkeys/backend.key")),
    cert: fs.readFileSync(path.join(__dirname, "/sslkeys/backend.crt")),
  };
  server = https.createServer(options, app);
}

server.listen(process.env.PORT, () =>
  console.log(`Express server running on port ` + process.env.PORT)
);

module.exports = app;
