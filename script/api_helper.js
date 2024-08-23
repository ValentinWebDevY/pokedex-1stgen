export class ApiHelper {
    BASE_URL = "https://pokebuildapi.fr/api/v1/";

    routes = {
        "pokemonGen" : "pokemon/generation/",
        "pokemonId" : "pokemon/",
        "pokemonName" : "pokemon/"
    }

    getPokemonByGen (numGen) {
        let api_url = this.BASE_URL + this.routes.pokemonGen + numGen;
        return fetch(api_url);
    }

    getPokemonById(pokemonId) {
        let api_url = this.BASE_URL + this.routes.pokemonId + pokemonId;
        return fetch(api_url);
    }

    getPokemonByName (pokemonName) {
        let api_url = this.BASE_URL + this.routes.pokemonName + pokemonName;
        return fetch(api_url);
    }
}