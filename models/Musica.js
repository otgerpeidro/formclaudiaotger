"use strict";

const mongoose = require('mongoose');

// primero definimos un esquema
const musicaSchema = mongoose.Schema({
    artist: String,
    song: {
        type: String,
        index: true,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

// creamos un método estático
musicaSchema.statics.list = function (filter, limit, skip, fields, sort, callback) {
    const query = Musica.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    query.exec(callback);
  };


// luego creamos el modelo
const Musica = mongoose.model('Musica', musicaSchema);

// Realmente no es necesario exportarlo, y aque en otros sitios podríamos recuperar el modelo usando: 
// mongoose.model('Musica')
module.exports = Musica;