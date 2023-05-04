import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

function Card({ url }) {
  const [pokemonData, setPokemonData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url);
      setPokemonData(response.data);
    };
    fetchData();
  }, [url]);

  const handleClick = () => {
    navigate(`/Details/${pokemonData?.id}`, {
      state: { pokemonData, otherState: "asdas" },
    });
  };
  return (
    <Box
      onClick={handleClick}
      sx={{
        width: 300,
        height: 400,
        m: "2rem",
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
          transform: "scale(1.1)",
        },
        pointer: "coursor",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <img src={pokemonData?.sprites.other.dream_world.front_default} />
      </Box>
      <Box>
        <span className="title">{pokemonData?.name}</span>
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
  );
}

export default Card;
