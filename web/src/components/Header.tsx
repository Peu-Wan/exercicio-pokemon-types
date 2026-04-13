import pokeball from "../assets/pokeball.svg";

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <img src={pokeball} alt="Pokébola" className="header__logo" />
          <div>
            <h1 className="header__title">Pokédex</h1>
            <span className="header__subtitle">1ª Geração</span>
          </div>
        </div>
        <p className="header__description">
          Explore os Pokémons, seus tipos e fraquezas.
        </p>
      </div>
    </header>
  );
}
