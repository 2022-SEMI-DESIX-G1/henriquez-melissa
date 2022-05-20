((Utils) => {
    const App = {
        htmlElements: {
            pokemonFinderForm: document.querySelector("#pokemon-finder-form"),
            pokemonFinderSearchType: document.querySelector(
                "#pokemon-finder-search-type"
            ),
            pokemonFinderInput: document.querySelector("#pokemon-finder-query"),
            pokemonFinderOutput: document.querySelector("#pokemon-finder-response"),
            pokemonFinderCleanerButton: document.querySelector("#boton-limpiar"),
        },
        init: () => {
            App.htmlElements.pokemonFinderForm.addEventListener(
                "submit",
                App.handlers.pokemonFinderFormOnSubmit
            );
            App.htmlElements.pokemonFinderCleanerButton.addEventListener("click", App.handlers.cleanerCardsOnClick);
        },
        handlers: {
            pokemonFinderFormOnSubmit: async (e) => {
                e.preventDefault();

                const query = App.htmlElements.pokemonFinderInput.value.toLowerCase();
                const searchType = App.htmlElements.pokemonFinderSearchType.value;
                try {
                    const response = await Utils.getPokemon({
                        query,
                        searchType,
                    });
                    const renderedTemplate = App.templates.render({
                        searchType,
                        response,
                    });
                    App.handlers.ViewCleanerButtonOnClick();
                    App.htmlElements.pokemonFinderOutput.innerHTML = await renderedTemplate;
                } catch (error) {

                    App.htmlElements.pokemonFinderOutput.innerHTML = `<h1>${error}</h1>`;
                }
            },
           
            cleanerCardsOnClick: (e) => {
                e.preventDefault();
                App.htmlElements.pokemonFinderOutput.innerHTML = "";
                App.htmlElements.pokemonFinderCleanerButton.hidden = true;
            },

            ViewCleanerButtonOnClick: () => {
                App.htmlElements.pokemonFinderCleanerButton.hidden = false;
            }
        },
        templates: {
            render: ({ searchType, response }) => {
                const renderMap = {
                    ability: App.templates.abilityCard,
                    pokemon: App.templates.pokemonCard,
                };
                return renderMap[searchType]
                    ? renderMap[searchType](response)
                    : App.templates.errorCard();
            },
            
            errorCard: () => `<h1>There was an error</h1>`,
            pokemonCard: async ({ id, name, weight, height, sprites, abilities, species}) => {
                evolutionChainArray = [];
                try{
                    const speciesPokemon = await Utils.getPokemon({
                        url: "si",
                        query: species.url,
                    });
                    console.log(speciesPokemon);

                    const evolutionChain = await Utils.getPokemon({
                        url: "si",
                        query: speciesPokemon.evolution_chain.url,
                    });
                    evolutionChainArray.push([evolutionChain.chain.species.name, evolutionChain.chain.is_baby]);
                    // cadena de evoluciones pokemon
                    for(let i = 0; i < evolutionChain.chain.evolves_to.length; i++){
                        evolutionChainArray.push([evolutionChain.chain.evolves_to[i].species.name, evolutionChain.chain.evolves_to[i].is_baby]);
                        for(let j = 0; j < evolutionChain.chain.evolves_to[i].evolves_to.length; j++){
                            evolutionChainArray.push([evolutionChain.chain.evolves_to[i].evolves_to[j].species.name, evolutionChain.chain.evolves_to[i].evolves_to[j].is_baby]);
                        }
                    }
                    evolutionChainEnd = [];
        
                    evolutionChainArray.forEach(element => {
                        evolutionChainEnd.push(`<li>${element[0]} ${element[1] ? "<img src='imagenes/bebe.png'>" : ""}</li>`);
                    });
                    console.log(evolutionChainArray);

               
                    const abilitiesList = abilities.map(
                        ({ ability, is_hidden }) =>
                            `<li>${ability.name}${is_hidden ? "<img src='imagenes/ojo.png'>" : ""
                            }</li>`
                    );
            
                    return `<div class="card">
                    <h1>${name} (${id})</h1><br>
                    <h3 class="titulo-sprites">Sprites</h3>
                    <h3 class="titulo-weight-height">Weight / Height</h3><br>
                    <img class="img-front" src="${sprites.front_default}">
                    <img class="img-back" src="${sprites.back_default}">
                    <p>${weight} / ${height}</p><br>
                    <h3 class="titulo-evolution">Evolution chain</h3>
                    <h3 class="titulo-abilities">Abilities</h3>
                    <br>
                    <ul class="lista-evolution">
                        ${evolutionChainEnd.join("")}
                    </ul>
                    <ul class=lista-abilities>
                        ${abilitiesList.join("")}
                    </ul>
                </div>`;
                }
                catch(error){
                    console.log(error);
                }
            },
            abilityCard: ({ name, pokemon }) => {
                const pokemonList = pokemon.map(
                    ({ pokemon, is_hidden }) =>
                        `<li>${pokemon.name}${is_hidden ? "<img src='imagenes/ojo.png'>" : ""
                        }</li>`
                );
                return `<div class="card-ability">
                <h1>${name}</h1><br>
                <h3 class="titulo-ability">Who can learn it?</h3><br>
                <ul class="pokemones">
                    ${pokemonList.join("")}
                </ul>
                
            </div>`;
            },
        },
    };
    App.init();
})(document.Utils);