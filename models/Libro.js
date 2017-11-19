"use strict";

const mongoose = require('mongoose');
const fs = require('fs');

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


/**
 * carga un json de libros
 */
libroSchema.statics.cargaJson = async function (fichero) {
    
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
    
      const libros = JSON.parse(data).libros;
      const numLibros = libros.length;
    
      for (var i = 0; i < libros.length; i++) {
        await (new Libro(libros[i])).save();
      }
    
      return numLibros;
    
    };

// luego creamos el modelo
const Libro = mongoose.model('Libro', libroSchema);

// Realmente no es necesario exportarlo, y aque en otros sitios podríamos recuperar el modelo usando: 
// mongoose.model('Libro')
module.exports = Libro;