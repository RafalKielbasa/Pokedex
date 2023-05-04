import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SportsMmaRoundedIcon from "@mui/icons-material/SportsMmaRounded";

export default function pokemonData({ favorites, setFavorites }) {
  const [isToggled, setIsToggled] = useState(false);
  const location = useLocation();
  const pokemonData = location.state?.pokemonData;

  const handleHeartClick = () => {
    if (isToggled === false) {
      setFavorites([...favorites, pokemonData.name]);
      setIsToggled(!isToggled);
    } else {
      const filteredFavorites = favorites.filter((item) => {
        console.log(item.name);
        return item.name !== pokemonData.name;
      });
      setIsToggled(!isToggled);
      setFavorites(filteredFavorites);
      console.log("zostaly", favorites);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "80vw",
          height: "30vh",
          m: "2rem",
          backgroundColor: "primary.dark",
          "&:hover": {
            transform: "scale(1.01)",
          },
          pointer: "coursor",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <img src={pokemonData?.sprites.other.dream_world.front_default} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <span className="title">{pokemonData?.name}</span>
            <FavoriteRoundedIcon
              sx={{
                marginLeft: "5px",
                color: isToggled ? "red" : "white",
                cursor: "pointer",
              }}
              onClick={handleHeartClick}
            />
            <SportsMmaRoundedIcon sx={{ marginLeft: "5px" }} />
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "35%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box className="asd">
              <span className="mini-title">{pokemonData?.weight}</span>
              <span className="big-title">weight</span>
            </Box>

            <Box className="asd">
              <span className="mini-title">
                {pokemonData?.abilities?.[0]?.ability?.name}
              </span>
              <span className="big-title">abilitie</span>
            </Box>

            <Box className="asd">
              <span className="mini-title"> {pokemonData?.height}</span>
              <span className="big-title">height</span>
            </Box>

            <Box className="asd">
              <span className="mini-title">{pokemonData?.base_experience}</span>
              <span className="big-title">base experience</span>
            </Box>
          </Box>
        </Box>
      </Box>

      <Link to={"/"}>
        <Box
          sx={{
            border: "1px solid red",
            width: "80vw",
            textAlign: "center",
            color: "red",
          }}
        >
          do strony glownej
        </Box>
      </Link>
    </Box>
  );
}
