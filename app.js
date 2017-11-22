var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const i18n = require('i18n');

const db = require('./lib/connectMongoose');

// Cargamos las definiciones de todos nuestros modelos
require('./models/Asistente');
require('./models/Libro');
require('./models/Musica');
require('./models/Usuario');
require('./models/PushToken');


var app = express();

//console.log(__dirname);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('soy un middleware, y estoy evaluando la petición', req.originalUrl);
  next();
});

// registrar lenguajes
i18n.configure({
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  register: global
});
app.use(i18n.init);


// Web
app.use('/', require('./routes/index'));

// API v1
app.use('/apiv1/asistentes', require('./routes/apiv1/asistentes'));
app.use('/apiv1/canciones', require('./routes/apiv1/canciones'));
app.use('/apiv1/libros', require('./routes/apiv1/libros'));
app.use('/apiv1/usuarios', require('./routes/apiv1/usuarios'));
app.use('/apiv1/pushtokens', require('./routes/apiv1/pushtokens'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  if (isAPI(req)) {
    res.json({success: false, error: err.message});
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});


function isAPI(req){
  return req.originalUrl.indexOf('/apiv') === 0;
}


module.exports = app;
