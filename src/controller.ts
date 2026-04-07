import { Request,Response } from "express";
import { Pokemon,PokemonResponse } from "./types";
import { getTypeWeaknesses, readJson } from "./services";


export async function catchThemAll(_req:Request, res:Response){

    try {

        const pokemons: Pokemon[] = await readJson();

        const pokemonWithWeakness = getTypeWeaknesses(pokemons);

    return res.status(200).json(pokemonWithWeakness);

    } catch (error) {
        res.status(500).send("We cannot catch then all :( ");
    }
};

export async function catchByName(req: Request, res: Response) {
    try {
            const name: string = req.body// Extract name from request body

        const pokemons: Pokemon[] = await readJson();        // Filter Pokémon by name
        const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase()))

        // Return the filtered Pokémon
        return res.status(200).json(filteredPokemons);
    } catch (error) {
        console.error("Error in catchByName:", error);
        return res.status(500).send("Failed to fetch Pokémon by name.");
    }
}

export async function testFilterByName(req: Request, res: Response) {
    try {
        const name: string = req.params.name || ''; 

        const pokemons: Pokemon[] = await readJson(); 

        const searchTerm = name.toLowerCase().trim();

        const filteredPokemons = searchTerm ?  pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm) 
        ): pokemons;
        

        // Return the filtered Pokémon
        return res.status(200).json(filteredPokemons);

        console.log(name)
        

    } catch (error) { 
        console.error("Error in testFilterByName:", error);
        return res.status(500).send("Failed to test filter by name.");
    }
}
