require("dotenv").config();
const service = require('./utils/pokemonData');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express());
app.use(cors());


const PokemonData = new service();

const port = process.env.PORT || 3000;

const cache = {};
const seg = 1 * 60;

app.get("/cache", function(req, res) {
    res.json({ data: cache });
});

app.post("/pokemon/:name", async function(req, res) {

    const { name } = req.params;

    if (cache[name] && (JSON.parse(cache[name]).date + (seg * 1000)) >= Date.now()) {
        return res.json({ name, data: JSON.parse(cache[name]), isCached: true });
    }

    let responseData;
    try {
        
        const pokemon = await PokemonData.pokemonInfo(name);
        responseData = pokemon;

        cache[name] = JSON.stringify(pokemon);

    } catch(e) {
        responseData = e;
    }
    res.json({ name, data: responseData, isCached: false });
});


app.listen(port, () => {
    console.log(`Run Puerto = ${port}...`);
});