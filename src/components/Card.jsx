import React from "react";

const Card = ({ pokemon }) => {
  return (
    <div style={styles.card}>
      <h3>{pokemon.name}</h3>
      <p>Type: {pokemon.types.join(", ")}</p>
      <p>Weaknesses: {pokemon.weakness.join(", ")}</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    margin: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
};

export default Card;