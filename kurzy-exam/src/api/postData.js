import axios from "axios";

export const postData = (
  catalog,
  id,
  pic,
  name,
  height,
  baseexp,
  weight,
  abilitie
) => {
  try {
    axios.post(`http://localhost:3000/${catalog}`, {
      id,
      pic,
      name,
      height,
      baseexp,
      weight,
      abilitie,
    });
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
