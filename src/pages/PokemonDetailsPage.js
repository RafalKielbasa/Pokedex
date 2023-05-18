import { useLocation, useSearchParams } from "react-router-dom";
import { DefaultLayout } from "../components/layouts/Default/DefaultLayout";
import { PokemonDetailsWrapper } from "../components/wrappers/PokemonDetailsWrapper/PokemonDetailsWrapper";
import { useCorrectPokemonQuery } from "../hooks/useCorrecrtPokemon";

export const PokemonDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useCorrectPokemonQuery(searchParams.get("name"));

  if (isLoading) {
    return;
  }
  return (
    <DefaultLayout>
      <PokemonDetailsWrapper pokemonData={data?.data} />
    </DefaultLayout>
  );
};
