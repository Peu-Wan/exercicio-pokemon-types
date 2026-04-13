interface DropDownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

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

export function DropDown({ label, options, value, onChange }: DropDownProps) {
  return (
    <div className="dropdown">
      <select
        className="dropdown__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`Filtrar por ${label}`}
      >
        <option value="">Todos os {label}s</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {TYPE_LABELS[opt] ?? opt}
          </option>
        ))}
      </select>
    </div>
  );
}
