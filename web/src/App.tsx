import { useEffect, useState } from "react";
import type { PokemonResponse } from "../../api/src/types";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";

export default function App() {
  const [pokemons, setPokemons] = useState<PokemonResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterWeakness, setFilterWeakness] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar Pokémons");
        return res.json();
      })
      .then((data: PokemonResponse[]) => setPokemons(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app">
      <Header />

      {loading && (
        <div className="app__state">
          <div className="spinner" />
          <p>Carregando Pokémons...</p>
        </div>
      )}

      {error && (
        <div className="app__state app__state--error">
          <p>⚠️ {error}</p>
          <p className="app__state-hint">
            Certifique-se de que o backend está rodando em{" "}
            <code>localhost:8080</code>
          </p>
        </div>
      )}

      {!loading && !error && (
        <Content
          pokemons={pokemons}
          search={search}
          filterType={filterType}
          filterWeakness={filterWeakness}
          onSearch={setSearch}
          onFilterType={setFilterType}
          onFilterWeakness={setFilterWeakness}
        />
      )}

      <Footer />
    </div>
  );
}
