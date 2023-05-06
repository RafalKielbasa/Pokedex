import { Navigation } from "../components/layouts/Navigation/Navigation";
import { useGetAllPokemonQuery } from "../hooks/useGetAllPokemon";
import { PokemonCard } from "../components/PokemonCard/PokemonCard";

export const HomePage = () => {
  useGetAllPokemonQuery();

  return (
    <>
      <Navigation />
      <PokemonCard />
    </>
  );
};
