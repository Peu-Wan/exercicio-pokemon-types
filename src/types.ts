type Pokemon = {
  id: number;
  name: string;
  types: string[];
};

interface PokemonResponse extends Pokemon {
  weakness: string[];
}

export { Pokemon, PokemonResponse };
