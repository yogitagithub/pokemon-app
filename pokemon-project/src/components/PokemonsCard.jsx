import React, { useEffect, useState } from "react";
import axios from "axios";

const PokemonCard = ({ searchQuery }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 52;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const results = response.data.results;

        const pokemonDetails = await Promise.all(
          results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return {
              id: res.data.id,
              name: res.data.name,
              image: res.data.sprites.other.home.front_default,
              types: res.data.types.map((t) => t.type.name).join(", "),
              weight: res.data.weight,
              height: res.data.height,
              abilities: res.data.abilities.map((a) => a.ability.name).join(", "),
              stats: res.data.stats.map((s) => ({
                name: s.stat.name,
                value: s.base_stat,
              })),
            };
          })
        );

        setPokemonData(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemon();
  }, [offset]);

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon); 
    console.log("Selected Pokemon Data:", pokemon);
  };

  const handleBackClick = () => {
    setSelectedPokemon(null); 
  };

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center py-10">
      <div className="container mx-auto px-4 mt-1">

     
        {selectedPokemon ? (
          <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto">
            <button
              onClick={handleBackClick}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md mb-4"
            >
              Back
            </button>

            <img
              src={selectedPokemon.image}
              alt={selectedPokemon.name}
              className="w-40 h-40 mx-auto"
            />

            <h2 className="text-2xl font-bold capitalize text-center mt-2">
              {selectedPokemon.name}
            </h2>

            <p className="text-gray-700 text-center">Type: {selectedPokemon.types}</p>
            <p className="text-gray-700 text-center">Weight: {selectedPokemon.weight}</p>
            <p className="text-gray-700 text-center">Height: {selectedPokemon.height}</p>
            <p className="text-gray-700 text-center">Abilities: {selectedPokemon.abilities}</p>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Stats:</h3>
              <ul className="list-disc list-inside">
                {selectedPokemon.stats.map((stat) => (
                  <li key={stat.name}>
                    {stat.name}: {stat.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
         
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredPokemon.length > 0 ? (
                filteredPokemon.map((pokemon) => (
                  <div
                    key={pokemon.id}
                    className="p-4 bg-white rounded-xl shadow-md flex flex-col items-center gap-2 transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() => handleCardClick(pokemon)}
                  >
                    <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32" />
                    <h2 className="text-xl font-bold capitalize cursor-pointer">{pokemon.name}</h2>
                  </div>
                ))
              ) : (
                <p className="text-white text-lg">No Pokémon found</p>
              )}
            </div>

          
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setOffset((prev) => Math.max(0, prev - limit))}
                disabled={offset === 0}
                className="px-4 py-2 bg-white text-black rounded-lg shadow-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setOffset((prev) => prev + limit)}
                className="px-4 py-2 bg-white text-black rounded-lg shadow-md"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;

