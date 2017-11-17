"use strict";

const mongoose = require('mongoose');

// primero definimos un esquema
const libroSchema = mongoose.Schema({
    name: String,
    surname: String,
    comment: String,
    created: {
        type: Date,
        default: Date.now
    }
})

// creamos un método estático
libroSchema.statics.list = function (filter, limit, skip, fields, sort, callback) {
    const query = Libro.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    query.exec(callback);
  };



// luego creamos el modelo
const Libro = mongoose.model('Libro', libroSchema);

// Realmente no es necesario exportarlo, y aque en otros sitios podríamos recuperar el modelo usando: 
// mongoose.model('Libro')
module.exports = Libro;