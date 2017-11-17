"use strict";

var express = require('express');
var router = express.Router();
const Asistente =  require('../../models/Asistente');
// no sería necesario requerir el modulo de Asistentes ya que podriamos recuperar el modelo con:
// mongoose.model('Asistentes')


/* GET /apiv1/asistentes */
router.get('/', function(req, res, next) {
  
const name = req.query.name;
const created = req.query.created;
const limit = parseInt(req.query.limit);
const skip = parseInt(req.query.skip);
const fields = req.query.fields;
const sort = req.query.sort;

// creo el filtro vaciío
const filter = {};
if (name) {
  filter.name = name;
}
if (created) {
  filter.created = created;
}

  Asistente.list(filter, limit, skip, fields, sort, (err, asistentes) => {
    if (err) {
      next(err);  // le decimos a express que devuelva el error
      return;
    }
    res.json({ success: true, result: asistentes });

  });

});


// POST /apiv1/asistentes
router.post('/', (req, res, next) => {
  console.log("123");
  console.log("Este es el cuerpo " + req.body);
// creamos un objeto de tipo Asitente
  const asistente = new Asistente(req.body);
// lo guardamos en la base de datos
  asistente.save((err, asistenteGuardado) => {
     if (err) {
       next(err);
       return;
     }
     res.json({ success: true, result: asistenteGuardado });
  });

});

module.exports = router;