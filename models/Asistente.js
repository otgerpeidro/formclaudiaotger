"use strict";

const mongoose = require('mongoose');

// primero definimos un esquema
const asistenteSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: {
        type: String//,
       // index: true,
       // unique: true
    },
    phone: String,
    comment: String,
    created: {
        type: Date,
        default: Date.now
    }
})

// creamos un método estático
asistenteSchema.statics.list = function (filter, limit, skip, fields, sort, callback) {
  const query = Asistente.find(filter);
  query.limit(limit);
  query.skip(skip);
  query.select(fields);
  query.sort(sort);
  query.exec(callback);
};




// luego creamos el modelo
const Asistente = mongoose.model('Asistente', asistenteSchema);

// Realmente no es necesario exportarlo, y aque en otros sitios podríamos recuperar el modelo usando: 
// mongoose.model('Asistentes')
module.exports = Asistente;