"use strict";

const mongoose = require('mongoose');
const fs = require('fs');

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

/**
 * carga un json de libros
 */
musicaSchema.statics.cargaJson = async function (fichero) {
    
      // Use a callback function with async/await
      const data = await new Promise((resolve, reject) => {
        // Encodings: https://nodejs.org/api/buffer.html
        fs.readFile(fichero, { encoding: 'utf8' }, (err, data) => {
          return err ? reject(err) : resolve(data);
        });
      });
    
      console.log(fichero + ' leido.');
    
      if (!data) {
        throw new Error(fichero + ' está vacio!');
      }
    
      const canciones = JSON.parse(data).canciones;
      const numCanciones = canciones.length;
    
      for (var i = 0; i < canciones.length; i++) {
        await (new Musica(canciones[i])).save();
      }
    
      return numCanciones;
    
    };



// luego creamos el modelo
const Musica = mongoose.model('Musica', musicaSchema);

// Realmente no es necesario exportarlo, y aque en otros sitios podríamos recuperar el modelo usando: 
// mongoose.model('Musica')
module.exports = Musica;