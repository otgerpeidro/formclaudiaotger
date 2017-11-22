'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Usuario =  require('../../models/Usuario');

const jwt = require('jsonwebtoken');
const config = require('../../local_config');
const hash = require('hash.js');

router.post('/authenticate', function (req, res, next) {
  
    console.log(req.body);
  const email = req.body.email;
  const pass = req.body.pass;

  // buscar el usuario
  Usuario.findOne({ email: email }, function (err, user) {
    if (err) return next(err);

    if (!user) {
      return res.json({
        ok: false, error: {
          code: 401,
          message: res.__('users_user_not_found')
        }
      });
    } else if (user) {

      // hashear la candidata y comparar los hashes
      const claveHash = hash.sha256().update(pass).digest('hex');

      // la contraseña es la misma?
      if (user.pass != claveHash) {
          console.log(user.pass);
          console.log(claveHash);
        return res.json({
          ok: false, error: {
            code: 401,
            message: res.__('users_wrong_password')
          }
        });
      } else {

        // hemos encontrado el usuario y la clave es la misma
        // le hacemos un token
        const token = jwt.sign({ user: user }, config.jwt.secret, config.jwt.options);

        // return the information including token as JSON
        return res.json({ ok: true, token: token });
      }
    }
  });

});

router.post('/register', (req, res, next) => {
    console.log(req.body);
  Usuario.createRecord(req.body, function (err) {
    if (err) return next(err);

    // usuario creado
    return res.json({ ok: true, message: res.__('users_user_created') });
  });
});

module.exports = router;