import axios from "axios";

export const postData = (catalog, fullPokemonData) => {
  try {
    axios.post(`http://localhost:3000/${catalog}`, { fullPokemonData });
  } catch (error) {
    console.error(error);
  }
};

//                   id={item.id}
//                   pic={item.sprites.front_default}
//                   name={item.name}
//                   height={item.height}
//                   baseexp={item.base_experience}
//                   weight={item.weight}
//                   abilitie={item.abilities[0].ability.name}
