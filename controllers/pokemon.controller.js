const axios = require('axios');

async function seleccionarEquipo(req, res, next) {
    const typesToChoose = [10, 11, 12];
    const typesString = ["fire", "water", "grass"];
    const pokeList = {};

    for (let i = 0; i < typesToChoose.length; i++) {
        // Elección de listado de pokemons
        const url = "https://pokeapi.co/api/v2/type/" + typesToChoose[i];
        const response = await axios.get(url);

        // Elección aleatoria de pokemon
        const pokeIndex = Math.floor(Math.random() * (response.data.pokemon.length - 0 + 1));
        const pokemonChosen = response.data.pokemon[pokeIndex];
        const pokemonNumber = pokemonChosen.pokemon.url.split("/")[6];
        const spriteImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonNumber + ".png";

        pokeList[typesString[i]] = spriteImage;
    }

    res.json(pokeList);

}

module.exports = {
    seleccionarEquipo
};
