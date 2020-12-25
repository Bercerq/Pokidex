import React from "react";
import Card_pokemon_css from "./Card_pokemon.module.css";

function CardPokemon(props) {
  const { pokemonId, pokemonName } = props;

  const imgUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonId}.png?raw=true`;

  return (
    <div className={Card_pokemon_css.Card}>
      <div className={Card_pokemon_css.img}>
        <img src={imgUrl} alt="Pokemon" className={Card_pokemon_css.imgData} />
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
