import { Request, Response } from "express";
import { Pokemon, PokemonResponse } from "./types";
import { getTypeWeaknesses, readJson } from "./services";
import { typeWeaknesses } from "./typesDicionary";

export async function getPokemonWeaknesses() {
  try {
    const pokemons: Pokemon[] = await readJson();
    const pokemonWithWeakness: PokemonResponse[] = getTypeWeaknesses(pokemons);

    if (pokemonWithWeakness.length === 0) {
      return [];
    }

    return pokemonWithWeakness;
    
  } catch (error) {
    
    console.error("Error fetching weaknesses:", error);

  }
}


export async function catchThemAll(_req: Request, res: Response) {
  try {
    const pokemons = await getPokemonWeaknesses();

    return res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).send("We cannot catch then all :( ");
  }
}

export async function catchByName(req: Request, res: Response) {
  try { 
    const name: string = req.body.name;

    // Corrigindo o uso de await para resolver a Promise corretamente
    const pokemons = await getPokemonWeaknesses();

    if (!pokemons) {
      return res.status(404).json({ error: "No Pokémon found." });
    }

    
    if (typeof name !== "string") {
      return res
        .status(400)
        .json({
          error: "O parâmetro 'name' é obrigatório e deve ser uma string.",
        });
    }

    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(name.toLowerCase()),
    );

    // Return the filtered Pokémon
    return res.status(200).json(filteredPokemons);
  } catch (error) {
    console.error("Error in catchByName:", error);
    return res.status(500).send("Failed to fetch Pokémon by name.");
  }
}

export async function catchByWeakness(req: Request, res: Response) {
  try {
    const weakness = req.body.weaknesses

    if(typeof weakness !== "string"){
        return 
        res.status(400).json({
          error: "O parametro 'weakness' é obrigatório, e precisa ser uma string"
        })
    }
    const pokemons = await getPokemonWeaknesses();

    const searchTerm = weakness.toLowerCase().trim();

    if (!pokemons) {
      return res.status(404).json({ error: "No Pokémon found." });
    }

    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.weakness.includes(searchTerm),
    );

    return res.status(200).json(filteredPokemons);
  } catch (error) {
    console.error("Error in catchByType:", error);
    return res.status(500).send("Failed to fetch Pokémon by type.");
  }
};

export async function catchByType(req: Request, res: Response) {
  try {
    const type = req.body.type 

    if(typeof type !== "string"){
        return 
        res.status(400).json({
          error: "O parametro 'type' é obrigatório, e precisa ser uma string"
        })
    }
    const pokemons = await getPokemonWeaknesses();

    if (!pokemons) {
      return res.status(404).json({ error: "No Pokémon found." });
    }
      
    const searchTerm = type.toLowerCase().trim();

    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.types.includes(searchTerm),
    );

    return res.status(200).json(filteredPokemons);
  } catch (error) {
    console.error("Error in catchByType:", error);
    return res.status(500).send("Failed to fetch Pokémon by type.");
  }
};


export async function testFilterByName(req: Request, res: Response) {
  try {
    const name = req.query.name;

    if (typeof name !== "string") {
      return res
        .status(400)
        .json({
          error: "O parâmetro 'name' é obrigatório e deve ser uma string.",
        });
    }

    const pokemons = await getPokemonWeaknesses();

    if (!pokemons) {
      return res.status(404).json({ error: "No Pokémon found." });
    }
    // 2. Agora é seguro usar os métodos de string
    const searchTerm = name.toLowerCase().trim();

    const filteredPokemons = searchTerm
      ? pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm),
        )
      : pokemons;

    // Return the filtered Pokémon
    return res.status(200).json(filteredPokemons);

    console.log(name);
  } catch (error) {
    console.error("Error in testFilterByName:", error);
    return res.status(500).send("Failed to test filter by name.");
  }
}

export async function testCatchByType(req: Request, res: Response) {
  try {
    const type = req.query.type 

    if(typeof type !== "string"){
        return 
        res.status(400).json({
          error: "O parametro 'type' é obrigatório, e precisa ser uma string"
        })
    }
    const pokemons = await getPokemonWeaknesses();

    if (!pokemons) {
      return res.status(404).json({ error: "No Pokémon found." });
    }
      
    const searchTerm = type.toLowerCase().trim();

    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.types.includes(searchTerm),
    );

    return res.status(200).json(filteredPokemons);
  } catch (error) {
    console.error("Error in catchByType:", error);
    return res.status(500).send("Failed to fetch Pokémon by type.");
  }
};

export async function testCatchByWeakness(req: Request, res: Response) {
  try {
    const weakness = req.query.weakness

    if(typeof weakness !== "string"){
        return 
        res.status(400).json({
          error: "O parametro 'weakness' é obrigatório, e precisa ser uma string"
        })
    }
    const pokemons = await getPokemonWeaknesses();

    const searchTerm = weakness.toLowerCase().trim();

    if (!pokemons) {
      return res.status(404).json({ error: "No Pokémon found." });
    }

    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.weakness.includes(searchTerm),
    );

    return res.status(200).json(filteredPokemons);
  } catch (error) {
    console.error("Error in catchByType:", error);
    return res.status(500).send("Failed to fetch Pokémon by type.");
  }
};
