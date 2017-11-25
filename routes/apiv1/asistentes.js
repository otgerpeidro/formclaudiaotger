"use strict";

var express = require('express');
var router = express.Router();
const Asistente =  require('../../models/Asistente');
var cors = require('cors');
// no sería necesario requerir el modulo de Asistentes ya que podriamos recuperar el modelo con:
// mongoose.model('Asistentes')

// Auth con JWT
// const jwtAuth = require('../../lib/jwtAuth');
// router.use(jwtAuth());

router.use(cors());

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
  console.log(req.body);
// creamos un objeto de tipo Asitente
  const asistente = new Asistente(req.body);
// lo guardamos en la base de datos
  asistente.save((err, asistenteGuardado) => {
     if (err) {
       return next(err);
     }
     res.json({ success: true, result: asistenteGuardado });
     
  });
});

// PUT /apiv1/asitentes Actualizar Asistente
router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  Asistente.update({_id: id}, req.body, (err, asistente) => {
    if (err) {
      return next(err);
    }
    res.json({ success: true, result: asistente });
  });
});

// PUT /apiv1/asitentes Borrar Asistente

router.delete('/:id', (req, res, next) => {
  var id = req.params.id;
  Asistente.remove({_id: id}, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ success: true, result: result});
  });
});


module.exports = router;