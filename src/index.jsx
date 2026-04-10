import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import axios from "axios";

const App = () => {
  const [search, setSearch] = React.useState("");
  const [type, setType] = React.useState("");
  const [weakness, setWeakness] = React.useState("");
  const [pokemons, setPokemons] = React.useState([]);

  // Example fetch function (replace with your API endpoint)
  React.useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get("http://localhost:3000/pokemons");
      const data = await response.data;
      setPokemons(data);
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = type ? pokemon.types.includes(type) : true;
    const matchesWeakness = weakness ? pokemon.weakness.includes(weakness) : true;
    return matchesSearch && matchesType && matchesWeakness;
  });

  return (
    <div>
      <Navbar
        onSearch={setSearch}
        onTypeChange={setType}
        onWeaknessChange={setWeakness}
      />
      <div style={styles.cardContainer}>
        {filteredPokemons.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "20px",
  },
};

ReactDOM.render(<App />, document.getElementById("root"));