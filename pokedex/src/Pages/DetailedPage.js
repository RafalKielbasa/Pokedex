import React, { useState } from "react";
import { DetailedPokemonCard, DetailedPokemonCardConatiner } from "./components";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonData } from "src/api";
const DetailedPage = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [inArena, setInArena] = useState(false);
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

  return (
    <DetailedPokemonCardConatiner>
      {pokemonStatus === "success" && (
        <DetailedPokemonCard
          value={detailPokemon}
          onClickFavorite={() => setIsFavorite((prev) => !prev)}
          onClickArena={() => setInArena((prev) => !prev)}
          isFavorite={isFavorite}
          inArena={inArena}
        />
      )}
    </DetailedPokemonCardConatiner>
  );
};

export default DetailedPage;
