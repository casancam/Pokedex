import React, { useEffect, useState } from "react";
import "./PokeList.css";
import PokemonCard from "./PokemonCard";
import pokeball from "../images/pokeball.png";

function PokeList() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [isLoading, setIsLoading] = useState(false);
  const [isAnyPokemonHovered, setIsAnyPokemonHovered] = useState(false);
  
  const getAllPokemons = async () => {
    if (!nextUrl || isLoading) return; // Prevent multiple simultaneous loads
    
    setIsLoading(true);
    try {
      // Fetch the list of pokemon from current page
      const res = await fetch(nextUrl);
      const data = await res.json();
      console.log(data);
      
      // Update the next page URL
      setNextUrl(data.next);
      
      // Fetch detailed data for each pokemon in the current page
      const pokemonPromises = data.results.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      );
      
      const pokemonData = await Promise.all(pokemonPromises);
      
      // Sort new pokemon data
      const sortedNewPokemon = pokemonData.sort((a, b) => a.id - b.id);
      
      // Combine with existing pokemon, avoiding duplicates
      setAllPokemons((currentPokemon) => {
        const combinedPokemon = [...currentPokemon, ...sortedNewPokemon];
        // Remove duplicates based on pokemon id
        const uniquePokemon = Array.from(
          new Map(combinedPokemon.map((item) => [item.id, item])).values()
        );
        return uniquePokemon.sort((a, b) => a.id - b.id);
      });
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Track if any Pokemon card is being hovered
  useEffect(() => {
    const handleHoverChange = (event) => {
      setIsAnyPokemonHovered(event.detail.hovered);
    };
    
    window.addEventListener('pokemonHoverChange', handleHoverChange);
    
    return () => {
      window.removeEventListener('pokemonHoverChange', handleHoverChange);
    };
  }, []);
  
  // Initial load
  useEffect(() => {
    getAllPokemons();
  }, []);
  
  // Function to check if device is mobile
  const isMobile = () => window.innerWidth <= 768;
  
  return (
    <div className="app-container">
      <div className="pokemon-container">
        {!isMobile() && (
          <div className={`hover-instructions ${isAnyPokemonHovered ? 'hidden' : ''}`}>
            <div className="instructions-content">
              <img src={pokeball} alt="pokeball" className="instructions-pokeball" />
              <p>Please hover or click over any Pokémon to see more details</p>
            </div>
          </div>
        )}
        <div className="all-container">
          {allPokemons.map((pokemonStats) => (
            <PokemonCard
              key={pokemonStats.id}
              id={pokemonStats.id.toString().padStart(3, "0")}
              image={pokemonStats.sprites.other["official-artwork"].front_default}
              imageShiny={pokemonStats.sprites.other["official-artwork"].front_shiny}
              name={pokemonStats.name.replace(/^./, (str) => str.toUpperCase())}
              type={pokemonStats.types[0].type.name}
              weight={pokemonStats.weight}
              height={pokemonStats.height}
              stats={pokemonStats.stats.map((stat) => stat.base_stat).slice(0, 3)}
              statsName={pokemonStats.stats.map((stat) => stat.stat.name).slice(0, 3)}
            />
          ))}
        </div>
        <div className="button-container">
          {nextUrl && !isLoading && (
            <button className="load-more" onClick={getAllPokemons}>
              Load More Pokemon
            </button>
          )}
          {isLoading && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}

export default PokeList;