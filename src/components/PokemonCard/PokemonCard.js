const PokemonCard = (props) => {
  const { name, height, base_experience, weight, ability, img } = props;

  return (
    <>
      <img href={img}></img>
      <div>{name}</div>
      <div>
        <div>
          <span>{height}</span>
          <span>Height</span>
        </div>
        <div>
          <span>{base_experience}</span>
          <span>Base Experience</span>
        </div>
        <div>
          <span>{weight}</span>
          <span>Weight</span>
        </div>
        <div>
          <span>{ability}</span>
          <span>Ability</span>
        </div>
      </div>
    </>
  );
};
