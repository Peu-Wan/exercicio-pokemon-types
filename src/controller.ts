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
            const name: string = req.body.name; 

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
        const name = req.query.name; 

       if (typeof name !== 'string') {
    return res.status(400).json({ error: "O parâmetro 'name' é obrigatório e deve ser uma string." });
}

const pokemons: Pokemon[] = await readJson();

// 2. Agora é seguro usar os métodos de string
const searchTerm = name.toLowerCase().trim();

        const filteredPokemons = searchTerm ?  pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm) 
        ): pokemons;

        console.log(name);

        

        // Return the filtered Pokémon
        return res.status(200).json(filteredPokemons);

        console.log(name)
        

    } catch (error) { 
        console.error("Error in testFilterByName:", error);
        return res.status(500).send("Failed to test filter by name.");
    }
}
