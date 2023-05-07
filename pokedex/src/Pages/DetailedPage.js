import React from "react";
import { DetailedPokemonCard, DetailedPokemonCardConatiner } from "./components";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonData } from "src/api";
const DetailedPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { data: detailPokemon, status: pokemonStatus } = useQuery({
    queryKey: ["pokemon", state],
    queryFn: () => fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}`),
    retry: false,
    refetchOnMount: false,
    retryOnMount: false,
    staleTime: 10 * (60 * 1000),
  });
  console.log({ detailPokemon });
  return (
    <DetailedPokemonCardConatiner>
      {pokemonStatus === "success" && <DetailedPokemonCard value={detailPokemon} />}
    </DetailedPokemonCardConatiner>
  );
};

export default DetailedPage;
