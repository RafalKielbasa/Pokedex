import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "./context/global";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { typeColor } from "./typeColor";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const Button = styled.button`
  border: 2px solid black;
  border-radius: 6px;
  background: transparent;
  width: 300px;
  height: 50px;
`;

const ButttonSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Body = styled.body`
  min-height: 100vh;
  background-color: ${({ swich, type }) =>
    swich ? "#212A3E" : typeColor(type)};
  color: ${({ swich }) => (swich ? "white" : "black")};
`;

const Container = styled.div`
  margin-top: 0px;
  padding: 2rem;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightSide = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
`;
export const MoreInfoComponent = () => {
  const { pokemons, setPokemons, swich } = useContext(GlobalContext);
  const location = useLocation();
  const { pokemon } = location.state;
  const navigate = useNavigate();
  const [swichFavorite, setSwichFavorite] = useState(false);
  const [swichFight, setSwichFight] = useState(false);

  const pokemonDetails = pokemons.find((poke) => poke.name === pokemon.name);

  const ifExistFavorite = (pokemon) => {
    return pokemon.favorite;
  };
  const ifExistFightArena = (pokemon) => {
    return pokemon.fight;
  };

  const fightArenaLenght = pokemons.filter((poke) => poke.fight === true);

  const addToFavorite = (pokemon) => {
    const pokemonIndex = pokemons.findIndex((p) => p.name === pokemon.name);
    console.log(pokemonIndex);

    if (!pokemon.favorite && !pokemon.isSaved) {
      axios
        .post(`http://localhost:3000/pokemons/`, {
          ...pokemon,
          favorite: true,
          isSaved: true,
        })
        .then((res) => {
          const updatedPokemon = { ...res.data, favorite: true, isSaved: true };
          setPokemons((prevPokemons) => {
            const updatedPokemons = [...prevPokemons];
            updatedPokemons[pokemonIndex] = updatedPokemon;
            return updatedPokemons;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .patch(`http://localhost:3000/pokemons/${pokemon.id}`, {
          ...pokemon,
          favorite: !pokemon.favorite,
        })
        .then((res) => {
          const updatedPokemon = { ...res.data };
          setPokemons((prevPokemons) => {
            const updatedPokemons = [...prevPokemons];
            updatedPokemons[pokemonIndex] = updatedPokemon;
            return updatedPokemons;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const addToFightArena = (pokemon) => {
    const pokemonIndex = pokemons.findIndex((p) => p.name === pokemon.name);
    console.log(pokemonIndex);
    if (fightArenaLenght.length >= 2) {
      alert("Arena is full like your girlfriend");
      return;
    }
    if (!pokemon.fight && !pokemon.isSaved) {
      axios
        .post(`http://localhost:3000/pokemons/`, {
          ...pokemon,
          fight: true,
          isSaved: true,
        })
        .then((res) => {
          const updatedPokemon = { ...res.data, fight: true, isSaved: true };
          setPokemons((prevPokemons) => {
            const updatedPokemons = [...prevPokemons];
            updatedPokemons[pokemonIndex] = updatedPokemon;
            return updatedPokemons;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .patch(`http://localhost:3000/pokemons/${pokemon.id}`, {
          ...pokemon,
          fight: !pokemon.fight,
        })
        .then((res) => {
          const updatedPokemon = { ...res.data };
          setPokemons((prevPokemons) => {
            const updatedPokemons = [...prevPokemons];
            updatedPokemons[pokemonIndex] = updatedPokemon;
            return updatedPokemons;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setSwichFavorite(ifExistFavorite(pokemonDetails));
  }, [pokemonDetails]);

  useEffect(() => {
    setSwichFight(ifExistFightArena(pokemonDetails));
  }, [pokemonDetails]);

  return (
    <Body type={pokemonDetails.type} swich={swich}>
      <Container>
        <LeftSide>
          <h1>
            {pokemonDetails.name.charAt(0).toUpperCase() +
              pokemonDetails.name.slice(1)}
          </h1>
          <img
            style={{ width: "350px", height: "350px" }}
            src={pokemonDetails.img}
          />
        </LeftSide>
        <RightSide>
          <p>Weight: {pokemonDetails.weight}</p>
          <p>Height: {pokemonDetails.height}</p>
          <p> Ability: {pokemonDetails.ability}</p>
          <p>Base Exp: {pokemonDetails.base_exp}</p>
        </RightSide>
      </Container>
      <ButttonSection>
        <Button onClick={() => navigate("/")}> Go to Home Page</Button>
        <FavoriteIcon
          style={{
            color: swichFavorite ? "#FF0000" : "black",
            width: "50px",
            height: "50px",
          }}
          onClick={() => addToFavorite(pokemonDetails)}
        />
        <SportsEsportsIcon
          style={{
            color: swichFight ? "red" : "black",
            width: "50px",
            height: "50px",
            opacity: fightArenaLenght.length >= 2 ? 0.5 : 1,
            cursor: fightArenaLenght.length >= 2 ? "not-allowed" : "pointer",
          }}
          onClick={() => addToFightArena(pokemonDetails)}
        />
      </ButttonSection>
    </Body>
  );
};
