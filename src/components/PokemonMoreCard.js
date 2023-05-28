import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

const Wprapper = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
`;

const RightDiv = styled.div`
  display: flex;
  padding: 20px;
  margin: 20px;
  flex-direction: column;
  float: right;
`;

const StyledIcon = styled(Icon)`
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const Body = styled.body`
  min-height: 100vh;
`;
const PokemonMoreCard = () => {
  const { theme } = useContext(ThemeContext);
  const [pokemon, setPokemon] = useState(null);
  const { pokemonName } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [pokemonName]);

  if (!pokemon || !pokemon.sprites) return <div>Pokemon not found :C</div>;

  const specialAttack = pokemon.stats.find(
    (stat) => stat.stat.name === "special-attack"
  );
  const specialDefense = pokemon.stats.find(
    (stat) => stat.stat.name === "special-defense"
  );
  const speed = pokemon.stats.find((stat) => stat.stat.name === "speed");

  const navToHome = () => {
    nav("/");
  };

  return (
    <Body
      style={{
        backgroundColor: theme ? "#720e9e" : "papayawhip",
      }}
    >
      <Wprapper>
        <StyledIcon
          onClick={navToHome}
          size="huge"
          className="fast backward icon"
        />
        <LeftDiv>
          <div>
            {" "}
            <img
              style={{ width: "450px", height: "450px" }}
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
            />
          </div>
        </LeftDiv>
        <RightDiv>
          <h1
            style={{
              fontSize: "50px",
            }}
          >
            {pokemon.name.toUpperCase()}
          </h1>
          <p>Height: {pokemon.height} 📏</p>
          <p>Weight: {pokemon.weight} 🏋️</p>
          <p>
            Special Attack: {specialAttack ? specialAttack.base_stat : "N/A"} 👊
          </p>
          <p>
            Special Defense: {specialDefense ? specialDefense.base_stat : "N/A"}{" "}
            ❗
          </p>
          <p>Speed: {speed ? speed.base_stat : "N/A"} 🏎️ </p>
        </RightDiv>
      </Wprapper>
    </Body>
  );
};

export default PokemonMoreCard;

/*
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

const Wprapper = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
`;

const RightDiv = styled.div`
  display: flex;
  padding: 20px;
  margin: 20px;
  flex-direction: column;
  float: right;
`;

const StyledIcon = styled(Icon)`
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const Body = styled.body`
  min-height: 100vh;
`;
const PokemonMoreCard = () => {
  const { theme } = useContext(ThemeContext);
  const [pokemon, setPokemon] = useState(null);
  const { pokemonName } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [pokemonName]);

  if (!pokemon || !pokemon.sprites) return <div>Pokemon not found :C</div>;

  const specialAttack = pokemon.stats.find(
    (stat) => stat.stat.name === "special-attack"
  );
  const specialDefense = pokemon.stats.find(
    (stat) => stat.stat.name === "special-defense"
  );
  const speed = pokemon.stats.find((stat) => stat.stat.name === "speed");

  const navToHome = () => {
    nav("/");
  };

  return (
    <Body
      style={{
        backgroundColor: theme ? "#720e9e" : "papayawhip",
      }}
    >
      <Wprapper>
        <StyledIcon
          onClick={navToHome}
          size="huge"
          className="fast backward icon"
        />
        <LeftDiv>
          <div>
            {" "}
            <img
              style={{ width: "450px", height: "450px" }}
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
            />
          </div>
        </LeftDiv>
        <RightDiv>
          <h1
            style={{
              fontSize: "50px",
            }}
          >
            {pokemon.name.toUpperCase()}
          </h1>
          <p>Height: {pokemon.height} 📏</p>
          <p>Weight: {pokemon.weight} 🏋️</p>
          <p>
            Special Attack: {specialAttack ? specialAttack.base_stat : "N/A"} 👊
          </p>
          <p>
            Special Defense: {specialDefense ? specialDefense.base_stat : "N/A"}{" "}
            ❗
          </p>
          <p>Speed: {speed ? speed.base_stat : "N/A"} 🏎️ </p>
        </RightDiv>
      </Wprapper>
    </Body>
  );
};

export default PokemonMoreCard;

*/
