const express = require('express');
const mysql = require('mysql');
const cors = require("cors");
const app = express();
const port = 3000;

const password = require("../config/sensitive").password;
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: password,
  database: "pokedex"
});

class Pokemon {
  constructor(id, name, default_image, official_artwork) {
    this.id = id;
    this.name = name;
    this.default = default_image;
    this.official = official_artwork;
    this.types = [];
  }
  addTypes(type) {
    this.types.push(type);
  }
}

app.use(cors());

const getAllPokemon = () => {
  return new Promise((resolve, reject) => {
    con.query("SELECT * FROM pokemon", (err, result) => {
      if (err) {
        console.log('Promise rejected in getAllPokemon:')
        return reject(err)
      };
      return resolve(result);
    });
  });
};

const getTypes = (id) => {
  return new Promise((resolve, reject) => {
    con.query(`SELECT type_name FROM pokemon_types WHERE pokemon_id = ${id}`, (err, result) => {
      if (err) {
        console.log('Promise rejected in getTypes:')
        return reject(err)
      };
      return resolve(result);
    });
  });
};

app.get('/', async (req, res) => {
  let pokedex = [];
  try {
    const allPokemon = await getAllPokemon();
    allPokemon.forEach(async (data) => {
      let pokemon = new Pokemon(data.id, data.pokemon_name, data.default_image, data.official_artwork);
      let typeData = await getTypes(pokemon.id);
      for (let i=0; i<typeData.length; i++) {
        pokemon.addTypes(typeData[i].type_name);
      }
      pokedex.push(pokemon);
      if (pokemon.id == 898) {
        res.send(pokedex);
      }
    });
    // res.send(pokedex); // failure
  } catch (err) {
    console.log(err);
  } finally {
    console.log(pokedex);
    // res.send(pokedex); // failure
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});