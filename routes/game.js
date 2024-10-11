var express = require('express');
var router = express.Router();
const {
  jugar,
  validarSesion,
  regresarPartida
} = require('../controllers/game.controller');

router.post('/jugar', validarSesion, jugar);

router.post('/regresar-partida', regresarPartida);


module.exports = router;
