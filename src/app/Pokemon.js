function Type({ type }) {
    return <span className="poke-type">{type}</span>;
  }
  
  export default function Pokemon({ pokemon }) {
    const { name, height, weight, sprites, types } = pokemon;
    const img = sprites.other.dream_world.front_default;
  
    return (
      <li className="poke-item">
        <img alt={name} width="200px" height="200px" src={img} />
        <h2>{name}</h2>
        <p>
          <b>Height:</b> {height}
        </p>
        <p>
          <b>Weight:</b> {weight}
        </p>
        <p>
          <b>Types:</b>{" "}
          {types.map((type, index) => (
            <Type key={index} type={type.type.name} />
          ))}
        </p>
      </li>
    );
  }
  