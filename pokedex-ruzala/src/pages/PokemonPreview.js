import { useQuery } from "@tanstack/react-query";
import fetchData from "../fetching/fetchData";
import { useParams } from "react-router-dom";

const baseURL = process.env.REACT_APP_BASE_URL;

export default function PokemonPreview() {
  const { id } = useParams();
  const pokemonData = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchData(`${baseURL}pokemon/${id}`),
    staleTime: 1000000,
  });
  return <div>{pokemonData.data && pokemonData.data.name}</div>;
}
