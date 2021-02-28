const mysql = require('mysql');
const axios = require('axios');
const password = require("../config/sensitive").password;

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: password,
    database: "pokedex"
});

con.connect(() => {
    getTypes();
    
    con.query("SELECT * FROM all_types", (err, result) => {
        if (err) throw err;
        console.log(result);
    });
});

async function getTypes() {
    const colors = ['#9a9e80', '#c92112', '#b39ad8', 
                '#ad3da4', '#e5ce75', '#b4964e', 
                '#c1d69a', '#6d529a', '#bab3c9',
                '#e98729', '#7891eb', '#82d979',
                '#ffec52', '#f54878', '#afe6df',
                '#5a49ff', '#634f38', '#f7abcc'];
    try {
        for (let i=1; i<=18; i++) {
            await axios.get(`https://pokeapi.co/api/v2/type/${i}`)
                .then(typeData => {
                    con.query(`INSERT INTO all_types VALUES ('${typeData.data.name}', ${typeData.data.id}, '${colors[i-1]}')`, (err, result) => {
                        if (err) throw err;
                        console.log(result);
                    });
                })
        }
      } catch (error) {
        console.error('Error connecting to the database: ', error);
      }
    getPokemon();
}

async function getPokemon() {
    try {
        for (let i=1; i<=898; i++) {
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(pokemonData => {
                    con.query(`INSERT INTO pokemon VALUES (${pokemonData.data.id}, '${pokemonData.data.name}', '${pokemonData.data.sprites.front_default}', '${pokemonData.data.sprites.other['official-artwork'].front_default}')`, (err, result) => {
                        if (err) throw err;
                        console.log(result);
                    });
                    for (let i=0; i<pokemonData.data.types.length; i++) {
                        con.query(`INSERT INTO pokemon_types VALUES (${pokemonData.data.id}, '${pokemonData.data.types[i].type.name}')`, (err, result) => {
                            if (err) throw err;
                            console.log(result);
                        });
                    }
                })
        }
    } catch (error) {
    console.error('Error connecting to the database: ', error);
    }
}