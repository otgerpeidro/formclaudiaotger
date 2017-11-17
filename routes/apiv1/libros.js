"use strict";

var express = require('express');
var router = express.Router();
const Libro =  require('../../models/Libro');
// no sería necesario requerir el modulo de Libro ya que podriamos recuperar el modelo con:
// mongoose.model('Libro')


/* GET /apiv1/libros */
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
  
    Libro.list(filter, limit, skip, fields, sort, (err, libros) => {
    if (err) {
      next(err);  // le decimos a express que devuelva el error
      return;
    }
    res.json({ success: true, result: libros });

  });

});


// POST /apiv1/libros
router.post('/', (req, res, next) => {
  console.log(req.body);
// creamos un objeto de tipo Libro
  const libro = new Libro(req.body);
// lo guardamos en la base de datos
  libro.save((err, libroGuardado) => {
     if (err) {
       next(err);
       return;
     }
     res.json({ success: true, result: libroGuardado });
  });
});


// PUT /apiv1/asitentes Actualizar Libro
router.put('/:id', (req, res, next) => {
  var id = req.params.id;
  Libro.update({_id: id}, req.body, (err, libro) => {
    if (err) {
      return next(err);
    }
    res.json({ success: true, result: libro });
  });
});

// PUT /apiv1/asitentes Borrar Libro

router.delete('/:id', (req, res, next) => {
  var id = req.params.id;
  Libro.remove({_id: id}, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ success: true, result: result});
  });
});

module.exports = router;