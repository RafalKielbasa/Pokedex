import { useLocation } from "react-router-dom";
import { useState } from "react";

const DetailsPage = () => {
  const location = useLocation();
  const id = location.state?.id;
  const pokemonData = location.state?.pokemonData;
  const pokemonDataFiltered = pokemonData.filter((item) => item.id === id);

  console.log(`id`, id);
  console.log(`pokemonDataFiltered `, pokemonDataFiltered);

  return (
    <>
      <div>DetailsPage</div>
      <div>{id}</div>
      <div>{pokemonDataFiltered[0].name}</div>
      <img
        src={pokemonDataFiltered[0].sprites.front_default}
        alt={"picture"}
        key={id}
      />
    </>
  );
};
export default DetailsPage;
