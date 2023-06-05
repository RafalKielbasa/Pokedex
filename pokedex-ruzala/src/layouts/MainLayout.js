import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import PokedexSide from "../components/PokedexSide";
import { useContext, useEffect, useState } from "react";
import { motion, useCycle } from "framer-motion";
import PokeballButton from "../components/PokeballButton";
import { GlobalContext } from "../App";
import NavBar from "../components/NavBar";

export default function MainLayout() {
  const { openPokedex } = useContext(GlobalContext);
  const [firstButtonAppear, setFirstButtonAppear] = useState(false);

  const [openPokedexAnimation, cycleOpenPokedexAnimation] = useCycle(
    "ready",
    "open"
  );

  const pokedexMidSectionVariants = {
    initial: {},
    ready: {},
    open: { width: "55%", transition: { duration: 5, ease: "easeInOut" } },
  };

  setTimeout(() => {
    setFirstButtonAppear(true);
  }, 4000);

  useEffect(() => cycleOpenPokedexAnimation(), [openPokedex]);

  const style = {
    display: "flex",
    flexDirection: "column",
    width: "0%",
    height: "88%",
    backgroundColor: "rgb(99 212 255 / 57%)",
    zIndex: "2",
    overflow: "hidden",
  };
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#262626",
        alignSelf: "center",
      }}
    >
      {firstButtonAppear && <PokeballButton />}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#4158D0",
          backgroundImage:
            "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
        }}
        id="mainSection"
      >
        <PokedexSide position="left" />
        <motion.div
          style={style}
          variants={pokedexMidSectionVariants}
          initial="initial"
          animate={openPokedexAnimation}
        >
          <NavBar />
          <Outlet />
        </motion.div>
        <PokedexSide position="right" />
      </Box>
    </Box>
  );
}
