import { useMemo } from "react";
import type { PokemonResponse } from "../../../api/src/types";
import { Cards } from "./Cards";
import { SearchBar } from "./searchBar";
import { DropDown } from "./dropDown";

interface ContentProps {
  pokemons: PokemonResponse[];
  search: string;
  filterType: string;
  filterWeakness: string;
  onSearch: (value: string) => void;
  onFilterType: (value: string) => void;
  onFilterWeakness: (value: string) => void;
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort();
}

export function Content({
  pokemons,
  search,
  filterType,
  filterWeakness,
  onSearch,
  onFilterType,
  onFilterWeakness,
}: ContentProps) {
  const allTypes = useMemo(
    () => uniqueSorted(pokemons.flatMap((p) => p.types)),
    [pokemons]
  );

  const allWeaknesses = useMemo(
    () => uniqueSorted(pokemons.flatMap((p) => p.weakness ?? [])),
    [pokemons]
  );

  const filtered = useMemo(() => {
    return pokemons.filter((p) => {
      const matchName = p.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const matchType = filterType ? p.types.includes(filterType) : true;
      const matchWeak = filterWeakness
        ? (p.weakness ?? []).includes(filterWeakness)
        : true;
      return matchName && matchType && matchWeak;
    });
  }, [pokemons, search, filterType, filterWeakness]);

  return (
    <main className="content">
      <div className="filters">
        <SearchBar value={search} onChange={onSearch} />
        <DropDown
          label="Tipo"
          options={allTypes}
          value={filterType}
          onChange={onFilterType}
        />
        <DropDown
          label="Fraqueza"
          options={allWeaknesses}
          value={filterWeakness}
          onChange={onFilterWeakness}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="content__empty">
          <p>Nenhum Pokémon encontrado para esta busca.</p>
        </div>
      ) : (
        <>
          <p className="content__count">
            {filtered.length}{" "}
            {filtered.length === 1 ? "Pokémon encontrado" : "Pokémons encontrados"}
          </p>
          <div className="card-grid">
            {filtered.map((pokemon) => (
              <Cards key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
