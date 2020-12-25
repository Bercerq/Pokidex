import React, { useState } from "react";
import CardPokemon from "./Card_pokemon/CardPokemon";
import Pokemon_body_css from "./Pokemon_body.module.css";
import { NavLink, Route, Switch } from "react-router-dom";
import OpenedCardPokemon from "./Card_pokemon/OpenedCardPokemon";

function PokemonBody({ loading, pokemons }) {
  const [setDataCard] = useState();

  // PageLoading
  if (loading) {
    return (
      <div className={Pokemon_body_css.lds_roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  return (
    <div>
      <div className={Pokemon_body_css.body_pokemon}>
        {pokemons.map((currentPost) => (
          <NavLink
            className={Pokemon_body_css.linkToCard}
            to={`/card/${currentPost.id}`}
            key={Math.random()}
          >
            <CardPokemon
              key={Math.random()}
              onClick={() => setDataCard(currentPost.id)}
              pokemonId={currentPost.id}
              pokemonName={currentPost.name}
            />
          </NavLink>
        ))}
      </div>

      {pokemons.map((currentPost) => (
        <Switch key={Math.random()}>
          <Route exact path={"/"} />
          <Route
            exact
            path={`/card/${currentPost.id}`}
            component={() => (
              <OpenedCardPokemon
                pokemonId={currentPost.id}
                pokemonName={currentPost.name}
                attack={currentPost.attack}
                defense={currentPost.defense}
                hp={currentPost.hp}
                specialAttack={currentPost.specialAttack}
                specialDefense={currentPost.specialDefense}
              />
            )}
          />
        </Switch>
      ))}
    </div>
  );
}

export default PokemonBody;
