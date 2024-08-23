import {ApiHelper} from "./api_helper.js";

let api_helper = new ApiHelper();

//get grid with all pokemon
let all_pokemon_images = document.querySelectorAll("#all-pokemon img");

// get pokemon details
let pkmn_image = document.getElementById("main-screen");
let pkmn_name = document.getElementById("name-screen");
let pkmn_evolution = document.getElementById("about-screen");
let pkmn_type = document.getElementById("type-screen");
let pkmn_number = document.getElementById("id-screen");

// get input search value and button
let input_search = document.getElementById("name-input");
let search_button = document.getElementById("search-btn");

// FEATURE : display gen One pokemon in my grid container and display info of the clicked pokemon on the pokedex
api_helper.getPokemonByGen(1)
    .then((response) => {
        response.json()
            .then((decoded) => {
                // console.log(decoded);

                // for each img change .src and change value by the pokemon id
                let i = 0;
                for (let pokemon of all_pokemon_images) {
                    pokemon.src = decoded[i].image;
                    pokemon.value = decoded[i].id;
                    i++;

                    pokemon.addEventListener("click", (event) => {
                        let selected_pkmn = event.target.value;
                        // position in decoded array = id pkmn - 1 -> bulbizarre ID 1 but decoded[0]
                        pkmn_image.src = decoded[selected_pkmn - 1].image;
                        pkmn_name.innerHTML = decoded[selected_pkmn - 1].name;

                        // if decoded[selected_pkmn - 1].apiEvolutions is undefined or not present "apiEvolution" will use an empty array as default value
                        let apiEvolutions = decoded[selected_pkmn - 1].apiEvolutions || [];
                        let have_evolution = apiEvolutions[0];

                        if (!have_evolution) {
                            pkmn_evolution.innerHTML = "Evolution: /";
                        } else {
                            pkmn_evolution.innerHTML = "Evolution: " + apiEvolutions[0].name;
                        }

                        pkmn_type.innerHTML = decoded[selected_pkmn - 1].apiTypes[0].name;
                        pkmn_number.innerHTML = "#" + decoded[selected_pkmn - 1].id;
                    })
                }
            })
    })

// FEATURE : display pokemon in pokedex by searching name or id

// get input value when search button is clicked
search_button.addEventListener("click", (event) => {
    let search_input_value = input_search.value.trim();
    // let is_input_value_number_of_pokedex = /^(1|[1-9][0-9]|1[0-4][0-9]|150)$/.test(search_input_value);
    console.log(search_input_value)

    //check for id
    if (search_input_value >= 1 && search_input_value <= 150) {
        api_helper.getPokemonById(search_input_value)
            .then((response) => {
                response.json()
                    .then((decoded) => {
                        // console.log(decoded);

                        pkmn_image.src = decoded.image;
                        pkmn_name.innerHTML = decoded.name;
                        // // if decoded[selected_pkmn - 1].apiEvolutions is undefined or not present "apiEvolution" will use an empty array as default value
                        let apiEvolutions = decoded.apiEvolutions || [];
                        let have_evolution = apiEvolutions[0];
                        if (!have_evolution) {
                            pkmn_evolution.innerHTML = "Evolution: /";
                        } else {
                            pkmn_evolution.innerHTML = "Evolution: " + apiEvolutions[0].name;
                        }

                        pkmn_type.innerHTML = decoded.apiTypes[0].name;
                        pkmn_number.innerHTML = "#" + decoded.id;
                    })
            })
    } else {
        // check if name input is valid
            api_helper.getPokemonByName(search_input_value)
                .then((responseByName) => {
                    if (responseByName.ok) {
                        responseByName.json()
                            .then((decodedByName) => {
                                // console.log((decoded));

                                pkmn_image.src = decodedByName.image;
                                pkmn_name.innerHTML = decodedByName.name;
                                // // if decoded[selected_pkmn - 1].apiEvolutions is undefined or not present "apiEvolution" will use an empty array as default value
                                let apiEvolutions = decodedByName.apiEvolutions || [];
                                let have_evolution = apiEvolutions[0];
                                if (!have_evolution) {
                                    pkmn_evolution.innerHTML = "Evolution: /";
                                } else {
                                    pkmn_evolution.innerHTML = "Evolution: " + apiEvolutions[0].name;
                                }

                                pkmn_type.innerHTML = decodedByName.apiTypes[0].name;
                                pkmn_number.innerHTML = "#" + decodedByName.id;
                            })
                    } else {
                        alert("Nom ou id incorrect");
                    }
                })
    }

})
