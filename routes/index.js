'use strict';

var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    // read the README.md file
    fs.readFile(__dirname + '/../README.md', { encoding: 'utf8' }, (err, data)=> {
      if (err) return next(new Error(`Can't read README.md file`));
      res.render('index', { title: 'NodeForm', readme: data });
    });
  });

router.get('/asistencia/', function(req, res, next) {
  res.render('asistente', { title: 'NodeForm' });
});

router.get('/libro/', function(req, res, next) {
  res.render('libro', { title: 'NodeForm' });
});

router.get('/musica/', function(req, res, next) {
  res.render('musica', { title: 'NodeForm' });
});
//Recibiendo parámetros en el body (cuerpo de la petición)

router.put('/enelbody', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('ok en el body');
});


module.exports = router;
