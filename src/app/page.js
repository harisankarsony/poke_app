"use client"

import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import { pokemonData } from "./pokemonData.js";

export default function App() {
  const IDLE = "idle";
  const LOADED = "loaded";
  const LOADING = "loading";
  const [status, setStatus] = useState(IDLE);
  const [pokeList, setPokeList] = useState([]);


  useEffect(() => {
    return (
      async function fetchPokemonList() {
        setStatus(LOADING);
        async function mapCallbackFunc(pokeItem) {
          let pokemonResponse = await fetch(pokeItem.url);
          let readableJsonData = await pokemonResponse.json();
          const { name, id, height, weight, types, sprites } = readableJsonData;

          return { name, id, height, weight, types, sprites };
        }

        let pokemonResponses = pokemonData.map(mapCallbackFunc);
        const pokenmonDetails = await Promise.all(pokemonResponses);
        setPokeList(pokenmonDetails);

        setTimeout(() => {
          setStatus(LOADED);
        }, 2000);
      }
    )
  }, []);

  // if (status === IDLE)
  // return <button onClick={() => fetchPokemonList()}>Fetch Pokemon</button>;

  if (status === LOADING) return <div className="pokemon-loader"></div>;

  return (
    status === LOADED && (
      <div>
        <ul className="poke-list">
          {pokeList.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} />
          ))}
        </ul>
      </div>
    )
  );
}

