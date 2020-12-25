import React from "react";
import { NavLink } from "react-router-dom";
import Card_pokemon_css from "./Card_pokemon.module.css";

function OpenedCardPokemon(props) {
  const {
    pokemonId,
    pokemonName,
    attack,
    defense,
    hp,
    specialAttack,
    specialDefense,
  } = props;

  const imgUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonId}.png?raw=true`;

  return (
    <div className={Card_pokemon_css.CardBody}>
      <div className={Card_pokemon_css.BoxImgOpenCard}>
        <img
          src={imgUrl}
          alt="Pokemon"
          className={Card_pokemon_css.imgOpenCard}
        />
      </div>

      <div className={Card_pokemon_css.BoxNameCard}>
        <div className={Card_pokemon_css.nameDataOpen}>Name: {pokemonName}</div>
        <div className={Card_pokemon_css.nameDataOpen}>attack: {attack}</div>
        <div className={Card_pokemon_css.nameDataOpen}>defense: {defense}</div>
        <div className={Card_pokemon_css.nameDataOpen}>hp: {hp}</div>
        <div className={Card_pokemon_css.nameDataOpen}>
          sepcialAttack: {specialAttack}
        </div>
        <div className={Card_pokemon_css.nameDataOpen}>
          sepcialDefense: {specialDefense}
        </div>
      </div>

      <NavLink className={Card_pokemon_css.exitButoon} to={"/"}>
        <div>
          <span className={Card_pokemon_css.exitButoonText}>Go back</span>
        </div>
      </NavLink>
    </div>
  );
}

export default OpenedCardPokemon;
