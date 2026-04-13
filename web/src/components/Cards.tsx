import { useState } from "react";
import type { PokemonResponse } from "../../../api/src/types";

const TYPE_COLORS: Record<string, string> = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
};

const TYPE_LABELS: Record<string, string> = {
  fire: "Fogo",
  water: "Água",
  grass: "Planta",
  electric: "Elétrico",
  psychic: "Psíquico",
  ice: "Gelo",
  dragon: "Dragão",
  dark: "Sombrio",
  fairy: "Fada",
  normal: "Normal",
  fighting: "Lutador",
  flying: "Voador",
  poison: "Veneno",
  ground: "Terra",
  rock: "Pedra",
  bug: "Inseto",
  ghost: "Fantasma",
  steel: "Aço",
};

interface CardsProps {
  pokemon: PokemonResponse;
}

export function Cards({ pokemon }: CardsProps) {
  const [imgError, setImgError] = useState(false);

  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const fallbackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  const idFormatted = String(pokemon.id).padStart(3, "0");

  return (
    <div className="card">
      <div className="card__image-wrapper">
        <img
          src={imgError ? fallbackUrl : spriteUrl}
          alt={pokemon.name}
          className="card__image"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        <span className="card__id">#{idFormatted}</span>
      </div>

      <div className="card__body">
        <h2 className="card__name">{pokemon.name}</h2>

        <div className="card__section">
          <span className="card__label">Tipos</span>
          <div className="card__badges">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className="badge"
                style={{
                  backgroundColor: TYPE_COLORS[type] ?? "#999",
                  color: "#fff",
                }}
              >
                {TYPE_LABELS[type] ?? type}
              </span>
            ))}
          </div>
        </div>

        <div className="card__section">
          <span className="card__label">Fraquezas</span>
          <div className="card__badges">
            {pokemon.weakness && pokemon.weakness.length > 0 ? (
              pokemon.weakness.map((w) => (
                <span
                  key={w}
                  className="badge badge--weakness"
                  style={{
                    backgroundColor: TYPE_COLORS[w] ?? "#999",
                    color: "#fff",
                  }}
                >
                  {TYPE_LABELS[w] ?? w}
                </span>
              ))
            ) : (
              <span className="card__empty">—</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
