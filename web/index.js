const renderPokemon = ({name, id, official, types})=> {
    name = name.substring(0,1).toUpperCase() + name.substring(1, name.length);
    if (types.length > 1) {
        document.querySelector('#pokedex').innerHTML += `<div class="card ${types[0]}"><div class="top"><h4>${name}</h4> <h4>#${id}</h4> </div><img src="${official}" height="200px" width="150px"><h5>Types: ${types[0]}, ${types[1]}</h5></div>`;
    } else {
        document.querySelector('#pokedex').innerHTML += `<div class="card ${types[0]}"><div class="top"><h4>${name}</h4> <h4>#${id}</h4> </div><img src="${official}" height="200px" width="150px"><h5>Type: ${types[0]}</h5></div>`;
    }
}

fetch("http://localhost:3000/")
    .then(res => res.json())
    .then(data => {
        data.forEach(renderPokemon);
    });