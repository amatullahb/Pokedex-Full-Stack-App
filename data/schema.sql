CREATE DATABASE pokedex;
USE pokedex;

CREATE TABLE pokemon (
	id SMALLINT,
    pokemon_name VARCHAR(100) NOT NULL,
    default_image VARCHAR(500),
    official_artwork VARCHAR(500),
    PRIMARY KEY(id)
);

CREATE TABLE all_types (
	type_name VARCHAR(100),
    id SMALLINT NOT NULL,
    color VARCHAR(20) NOT NULL,
    PRIMARY KEY (type_name)
);

CREATE TABLE pokemon_types (
	pokemon_id SMALLINT,
    type_name VARCHAR(100),
    FOREIGN KEY (pokemon_id)  REFERENCES pokemon(id),
    FOREIGN KEY (type_name)  REFERENCES all_types(type_name)
);