const axios = require("axios");

const main = async () => {
  const { data } = await axios("https://pokeapi.co/api/v2/pokemon/ditto");
  idPokemon(data);
  return data;
};

const idPokemon = async ({id, name, weight, height, sprites, abilities, species}) => {
  console.log('El name del pokemon es: '+name);
  console.log('El id del pokemon es: '+id);
  console.log(`La altura de ${name} es ${height} y el peso es ${weight}`);
  pokemonAbilitiesList({abilities, name});
  await pokemonEvolutions({species, name});
};

const pokemonAbilitiesList = ({abilities, name}) => {
  const pokemonAbilitiesList = abilities.map
    ({ ability }) =>{ return ability.name }
  );
  console.log(`Las habilidades de ${name} son: ${pokemonAbilitiesList.join(", ")}`);
  };

  const pokemonEvolutions = async ({ species, name }) => {


    const evoluciones = await getEvoluciones(species);
    const pokemonEvolvesList = evoluciones.map(
      ({ name }) =>{ return name }
    );
    console.log(`Evoluciones de ${name} son: ${pokemonEvolvesList.join(", ")}`);
  };

  const getEvoluciones = async ({ url }) => {
    const { data } = await axios(url);
    const chain = await getUrlSpecie(data);
    
    const listEvoluciones = getListEvoluciones(chain, []);
    
    return listEvoluciones;
  }; 

  const getUrlSpecie = async ({evolution_chain}) => {
    const {data} = await axios(evolution_chain.url);
    return data.chain;
  };

  const getListEvoluciones = ({species, evolves_to}, arrEvolutions) => {
    arrEvolutions.push({
      name: species.name
    });
    const detailEvolution = evolves_to.map(
      ({ species, evolves_to }) => {
          getListEvoluciones({ species, evolves_to }, arrEvolutions);
        }
     );
    return arrEvolutions;
  };

main();