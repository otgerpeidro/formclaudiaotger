'use strict';

const mongoose = require('mongoose');
const hash = require('hash.js');
const v = require('validator');

const usuarioSchema = mongoose.Schema({
  name: { type: String, index: true },
  email: { type: String, index: true },
  pass: String
});

usuarioSchema.statics.exists = function (idusuario, cb) {
  Usuario.findById(idusuario, function (err, user) {
    if (err) return cb(err);
    return cb(null, user ? true : false);
  });
};

usuarioSchema.statics.createRecord = function (nuevo, cb) {
  // validaciones
  const valErrors = [];
  if (!(v.isAlpha(nuevo.name) && v.isLength(nuevo.name, 2))) {
    valErrors.push({ field: 'name', message: __('validation_invalid', { field: 'name' }) });
   
  }

  if (!v.isEmail(nuevo.email)) {
    valErrors.push({ field: 'email', message: __('validation_invalid', { field: 'email' }) });
    
  }

  if (!v.isLength(nuevo.pass, 6)) {
    valErrors.push({ field: 'pass', message: __('validation_minchars', { num: '6' }) });
    
  }

  if (valErrors.length > 0) {
    return cb({ code: 422, errors: valErrors });
    
  }

  // comprobar duplicados
  // buscar el usuario
  Usuario.findOne({ email: nuevo.email }, function (err, user) {
    if (err) {
      return cb(err);
    }

    // el usuario ya existía
    if (user) {
      return cb({ code: 409, message: __('user_email_duplicated') });
      
    } else {

      // Hago hash de la password
      let hashedClave = hash.sha256().update(nuevo.pass).digest('hex');

      nuevo.pass = hashedClave;

      // creo el usuario
      new Usuario(nuevo).save(cb);
    }
  });
};

var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;