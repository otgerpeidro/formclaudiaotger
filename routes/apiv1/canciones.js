"use strict";

var express = require('express');
var router = express.Router();
const Musica =  require('../../models/Musica');
// no sería necesario requerir el modulo de Musica ya que podriamos recuperar el modelo con:
// mongoose.model('Musica')


/* GET /apiv1/canciones */
router.get('/', function(req, res, next) {

    const song = req.query.song;
    const created = req.query.created;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;
    
    // creo el filtro vaciío
    const filter = {};
    if (song) {
      filter.song = song;
    }

    if (created) {
        filter.created = created;
      }
  
    Musica.list(filter, limit, skip, fields, sort, (err, canciones) => {
    if (err) {
      next(err);  // le decimos a express que devuelva el error
      return;
    }
    res.json({ success: true, result: canciones });

  });

});


// POST /apiv1/canciones
router.post('/', (req, res, next) => {
  console.log(req.body);
// creamos un objeto de tipo Musica
  const cancion = new Musica(req.body);
// lo guardamos en la base de datos
  cancion.save((err, cancionGuardada) => {
     if (err) {
       next(err);
       return;
     }
     res.json({ success: true, result: cancionGuardada });
  });

});

module.exports = router;