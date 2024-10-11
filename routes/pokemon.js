var express = require('express');
var router = express.Router();
const {
    seleccionarEquipo
} = require('../controllers/pokemon.controller')

/* GET users listing. */
router.get('/select-pokes', seleccionarEquipo);

module.exports = router;
