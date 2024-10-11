const mongoose = require('mongoose');

// Definir el esquema para los tipos de Pokémon y sus URLs
const pokemonSchema = new mongoose.Schema({
    fire: {
        type: String,
        required: true
    },
    water: {
        type: String,
        required: true
    },
    grass: {
        type: String,
        required: true
    }
});

module.exports = {
    pokemonSchema
};
