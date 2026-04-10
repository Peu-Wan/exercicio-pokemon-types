import React from "react";

const Navbar = ({ onSearch, onTypeChange, onWeaknessChange }) => {
  return (
    <nav style={styles.navbar}>
      <input
        type="text"
        placeholder="Search Pokémon"
        onChange={(e) => onSearch(e.target.value)}
        style={styles.searchBar}
      />
      <select onChange={(e) => onTypeChange(e.target.value)} style={styles.dropdown}>
        <option value="">Select Type</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        {/* Add more types as needed */}
      </select>
      <select onChange={(e) => onWeaknessChange(e.target.value)} style={styles.dropdown}>
        <option value="">Select Weakness</option>
        <option value="electric">Electric</option>
        <option value="rock">Rock</option>
        <option value="ice">Ice</option>
        {/* Add more weaknesses as needed */}
      </select>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #ddd",
  },
  searchBar: {
    padding: "5px",
    fontSize: "16px",
  },
  dropdown: {
    padding: "5px",
    fontSize: "16px",
    marginLeft: "10px",
  },
};

export default Navbar;