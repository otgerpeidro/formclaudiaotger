'use strict';

const mongoose = require('mongoose');
const readLine = require('readline');
const async = require('async');

const db = require('./lib/connectMongoose');

// Cargamos las definiciones de todos nuestros modelos
require('./models/Asistente');
require('./models/Libro');
require('./models/Musica');
require('./models/Usuario');
require('./models/PushToken');

db.once('open', () => {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Are you sure you want to empty DB? (no) ', function (answer) {
    rl.close();
    if (answer.toLowerCase() === 'yes') {
      runInstallScript();
    } else {
      console.log('DB install aborted!');
      return process.exit(0);
    }
  });

});

function runInstallScript() {

  async.series([
      initAsistente,
      initLibro,
      initMusica,
      initUsuarios
    ], (err) => {
      if (err) {
        console.error('Hubo un error: ', err);
        return process.exit(1);
      }

      return process.exit(0);
    }
  );

}

function initAsistente(cb) {
  const Asistente = mongoose.model('Asistente');

  Asistente.remove({}, ()=> {

    console.log('Asistente borrados.');

    // Cargar asistentes.json
    const fichero = './asistentes.json';
    console.log('Cargando ' + fichero + '...');

    Asistente.cargaJson(fichero).then(numLoaded => {
      console.log(`Se han cargado ${numLoaded} asistentes.`);
      return cb(null, numLoaded);
    }).catch(err => cb(err) );

  });

}

function initLibro(cb) {
    const Libro = mongoose.model('Libro');
  
    Libro.remove({}, ()=> {
  
      console.log('Libros borrados.');
  
      // Cargar libros.json
      const fichero = './libros.json';
      console.log('Cargando ' + fichero + '...');
  
      Libro.cargaJson(fichero).then(numLoaded => {
        console.log(`Se han cargado ${numLoaded} asistentes.`);
        return cb(null, numLoaded);
      }).catch(err => cb(err) );
  
    });
  
  }

  function initMusica(cb) {
    const Musica = mongoose.model('Musica');
  
    Musica.remove({}, ()=> {
  
      console.log('Canciones borradas.');
  
      // Cargar canciones.json
      const fichero = './canciones.json';
      console.log('Cargando ' + fichero + '...');
  
      Musica.cargaJson(fichero).then(numLoaded => {
        console.log(`Se han cargado ${numLoaded} canciones.`);
        return cb(null, numLoaded);
      }).catch(err => cb(err) );
  
    });
  
  }

  function initUsuarios(cb) {
    const Usuario = mongoose.model('Usuario');
  
    Usuario.remove({}, ()=> {
  
      const usuarios = [
        { name: 'admin', email: 'otgerpeidro@hotmail.com', pass: 'Girona090618' }
      ];
  
      async.eachSeries(usuarios, Usuario.createRecord, (err)=> {
        if (err) return cb(err);
  
        console.log(`Se han cargado ${usuarios.length} usuarios.`);
        return cb(null, usuarios.length);
      });
  
    });
  }