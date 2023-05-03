import { useGetAllPokemonQuery } from '../hooks/useGetAllPokemon';

export const HomePage = () => {
  console.log(process.env.REACT_APP_API_URL);
  useGetAllPokemonQuery();
  return <h1>home</h1>;
};
