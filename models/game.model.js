const mongoose = require('mongoose');
// const pokemonSchema = require('./pokemon.model').pokemonSchema;

const {
    pokemonSchema
} = require('./pokemon.model')

const sesionSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true
    },
    ganados: {
        type: Number,
        default: 0
    },
    perdidos: {
        type: Number,
        default: 0
    },
    historial: {
        type: [mongoose.Types.ObjectId],
        ref: "Historial"
    },
    // historiaUsuario: {
    //     type: [String]
    // },
    // historiaCPU: {
    //     type: [String]
    // },
    equipoElegido: {
        type: pokemonSchema,
        required: true
    }
})

const SesionModel = mongoose.model('Sesion', sesionSchema);

module.exports = {
    SesionModel
};
