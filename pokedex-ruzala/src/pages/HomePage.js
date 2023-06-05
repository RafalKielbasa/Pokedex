import { useContext } from "react";
import { GlobalContext } from "../App";
import { motion } from "framer-motion";
import pokemonLogo from "../images/PokemonLogo.svg";
import favoritesLogo from "../images/FavoritesLogo.svg";
import arenaLogo from "../images/ArenaLogo.svg";
import editLogo from "../images/EditLogo.svg";
import MainMenuButton from "../components/MainMenuButton";

export default function HomePage() {
  const { loginState, readyToDisplay } = useContext(GlobalContext);
  if (readyToDisplay) {
    return (
      <motion.div
        style={{
          display: "flex",
          height: "90%",
          width: "100%",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MainMenuButton
          navigation="/pokemons"
          logo={pokemonLogo}
          label="Pokemony"
        />
        <MainMenuButton
          navigation="/favorites"
          logo={favoritesLogo}
          label="Ulubione"
        />
        <MainMenuButton navigation="/arena" logo={arenaLogo} label="Arena" />

        {loginState && (
          <MainMenuButton navigation="/edit" logo={editLogo} label="Edytuj" />
        )}
      </motion.div>
    );
  }
}
