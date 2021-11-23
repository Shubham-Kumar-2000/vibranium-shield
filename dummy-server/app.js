let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let config = require('./app/config/config.json');
let dbUri = config[process.env.NODE_ENV].databaseUri;
let passport = require('passport');
let routerJunction = 'routes';
if(process.env.NODE_ENV === "dummy"){
    routerJunction = 'dummyRoutes';
}

let indexRouter = require(`./app/${routerJunction}/index`);
let usersRouter = require(`./app/${routerJunction}/users`);
let postRouter = require(`./app/${routerJunction}/posts`);

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);

if(dbUri === ""){
    console.log("Dummy DB Connected!");
}
else {
    mongoose.connect(dbUri).then((db) => {
      console.log("DB Connected!");
    });
}
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
