import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { useFavorites } from "../FavoritesContext";
import { Link } from "react-router-dom";
import "./MainPage.css";

export const typeColor = (type) => {
  switch (type) {
    case "grass":
      return "lightgreen";
    case "fire":
      return "rgba(210, 26, 43, 0.89)";
    case "water":
      return "lightblue";
    case "electric":
      return "yellow";
    case "poison":
      return "#B728FB";
    case "normal":
      return " rgba(10, 9, 9, 0.42)";
    case "psychic":
      return "rgba(224, 19, 109, 0.69)";
    case "ground":
      return "rgba(171, 128, 41, 0.69)";
    case "bug":
      return "rgba(172, 216, 53, 0.69)";
  }
};

const Main = styled.div`
  background-color: ${({ type }) => typeColor(type)};
  width: 300px;
  height: 400px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 8px 8px 24px 5px rgba(66, 68, 90, 1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  padding: 1rem;
`;

export const MainPage = () => {
  const [pokenumber, setNumber] = useState(1);

  const { addFavorite } = useFavorites();

  const handleClick = () => {
    const number = Math.floor(Math.random() * 100);
    setNumber(number);
  };
  const { data, isLoading, error } = useQuery(
    ["pokemon", pokenumber],
    async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokenumber}`
      );
      const data = await response.json();
      console.log(data);
      return data;
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error !</div>;

  return (
    <div className="container">
      <Main type={data?.types[0].type.name}>
        <img
          style={{ width: "150px", height: "150px" }}
          src={data?.sprites.other.dream_world.front_default}
          alt="pokemon"
        />
        <p
          style={{
            fontSize: "20px",
          }}
        >
          #{data?.id}
        </p>
        <p>Name: {data?.name.toUpperCase()}</p>
        <p>Type: {data?.types[0].type.name}</p>
        <p>
          {" "}
          <Icon name="heart icon" />: {data?.stats[0].base_stat}
        </p>

        <Icon
          onClick={() => handleClick()}
          size="huge"
          name="redo alternate icon"
        />
        <button
          style={{ background: "transparent", marginTop: "10px" }}
          onClick={() => addFavorite(data)}
          class="ui active button"
        >
          <i class="user icon"></i>
          Add to Favorite
        </button>
      </Main>
    </div>
  );
};
