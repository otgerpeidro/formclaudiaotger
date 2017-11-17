var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/asistencia/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//Recibiendo parámetros en el body (cuerpo de la petición)

router.put('/enelbody', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('ok en el body');
});


module.exports = router;
