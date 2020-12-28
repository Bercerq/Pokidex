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
          unloader={<img src={unloadCard} className={Card_pokemon_css.unloadCard}/>}
        />
      </div>

      <div className={Card_pokemon_css.name}>
        <span className={Card_pokemon_css.nameData}>{pokemonName}</span>
      </div>
    </div>
  );
}

export default CardPokemon;

// import React, { useState, useEffect } from "react";
// import Card_pokemon from "./Card_pokemon/Card_pokemon";
// import Pokemon_body_css from "./Pokemon_body.module.css";
// import axios from "axios";

// function Pokemon_body() {
//   const [pokemons, setPokemons] = useState([]);
//   const [flag, setFlag] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postPerPage, setPostPerPage] = useState(10);

//   useEffect(() => {
//     axios
//       .post("https://pokemonapishort.herokuapp.com/PokeApi/getPokemons", {
//         filterOptions: [{ nameFilter: "" }],
//         // limit:12,
//         // offset: 2,
//       })
//       .then((result) => {
//         setPokemons(result.data.pokemons);
//       });
//   }, [flag]);
//   return (
//     <div className={Pokemon_body_css.body_pokemon}>
//       {pokemons.map((pokemon) => (
//         <Card_pokemon pokemonId={pokemon.id} pokemonName={pokemon.name} />
//       ))}

//       <div className={Pokemon_body_css.paginathion}>
//         <span className={Pokemon_body_css.pagibutton}>1</span>
//         <span className={Pokemon_body_css.pagibutton}>2</span>
//         <span className={Pokemon_body_css.pagibutton}>3</span>
//         <span className={Pokemon_body_css.pagibutton}>4</span>
//         <span className={Pokemon_body_css.pagibutton}>5</span>
//       </div>
//     </div>
//   );
// }
