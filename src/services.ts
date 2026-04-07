import { json } from 'express';
import { typeWeaknesses } from "./typesDicionary";
import { Pokemon, PokemonResponse } from "./types";
import { readFile } from "node:fs/promises";

const dbPath = './src/data/pokemons.json';


export async function readJson() {
  const data = await readFile(dbPath,'utf-8');

  const pokemons:Pokemon[] = JSON.parse(data)

  return pokemons
}

export function getTypeWeaknesses(pokemons: Pokemon[]): PokemonResponse[] {
  try {
    const pokemonWithWeaknesses: PokemonResponse[] = pokemons.map((pokemon: Pokemon) => {
      const weakness = Array.from(
        new Set(
          pokemon.types
            .map((type) => typeWeaknesses[type] || []) // Handle undefined types
            .flat()
        )
      );

      // Return a valid PokemonResponse object
      return { ...pokemon, weakness };
    });

    return pokemonWithWeaknesses; // Return the final array
  } catch (error) {
    console.error("Error fetching type weaknesses:", error);
    return []; // Return an empty array in case of error
  }
}