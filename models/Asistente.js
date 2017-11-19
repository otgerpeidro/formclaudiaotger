"use strict";

const mongoose = require('mongoose');
const fs = require('fs');


// primero definimos un esquema
const asistenteSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: {
        type: String,
        index: true,
        unique: true
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


/**
 * carga un json de asistentes
 */
asistenteSchema.statics.cargaJson = async function (fichero) {
    
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
    
      const asistentes = JSON.parse(data).asistentes;
      const numAsistentes = asistentes.length;
    
      for (var i = 0; i < asistentes.length; i++) {
        await (new Asistente(asistentes[i])).save();
      }
    
      return numAsistentes;
    
    };



// luego creamos el modelo
const Asistente = mongoose.model('Asistente', asistenteSchema);

// Realmente no es necesario exportarlo, y aque en otros sitios podríamos recuperar el modelo usando: 
// mongoose.model('Asistentes')
module.exports = Asistente;