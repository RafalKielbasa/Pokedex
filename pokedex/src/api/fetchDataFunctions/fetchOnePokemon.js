import axios from "axios";
import { filterOnlyNeedData } from "src/helpers/";
export const fetchOnePokemon = async (editedList, name) => {
  const PokemonUrl = editedList?.includes(name)
    ? `http://localhost:3000/edited/${name}`
    : `https://pokeapi.co/api/v2/pokemon/${name}`;
  const { data } = await axios.get(PokemonUrl);
  const filteredData = filterOnlyNeedData(data);
  const updatedData = {
    ...filteredData,
    winCount: 0,
    lossCount: 0,
    tieCount: 0,
  };
  return updatedData;
};
