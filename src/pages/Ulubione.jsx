import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function Ulubione({ favorites, setFavorites }) {
  useEffect(() => {
    const storedData = localStorage.getItem(`favorites`);
    console.log("storagedata", storedData);
    if (storedData) {
      return setFavorites(JSON.parse(storedData));
    }
    return;
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {favorites?.map((item) => {
        return (
          <Card
            key={item}
            url={`https://pokeapi.co/api/v2/pokemon/${item}`}
            gate={true}
          />
        );
      })}
    </Box>
  );
}
