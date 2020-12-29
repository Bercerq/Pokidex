import React from "react";
import Card_pokemon_css from "./Card_pokemon.module.css";
import { Img } from "react-image";
import loadCard from "../../../distm/img/5927a9b06149a6b2-.gif";
import unloadCard from "../../../distm/img/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png";
function CardPokemon(props) {
  const { pokemonId, pokemonName } = props;



  return (
    <div className={Card_pokemon_css.Card}>
      <div className={Card_pokemon_css.img}>
        <Img
          src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonId}.png?raw=true`}
          alt="Pokemon"
          className={Card_pokemon_css.imgData}
          loader={<img src={loadCard} />}
          unloader={
            <img src={unloadCard} className={Card_pokemon_css.unloadCard} />
          }
        />
      </div>

      <div className={Card_pokemon_css.name}>
        <span className={Card_pokemon_css.nameData}>{pokemonName}</span>
      </div>
    </div>
  );
}

export default CardPokemon;
