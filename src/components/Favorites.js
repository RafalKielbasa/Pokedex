import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { typeColor } from "./MainPage";
import { useFavorites } from "../FavoritesContext";

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
`;

const Favorites = () => {
  const { favorites } = useFavorites();

  console.log("Rendering Favorites component with data:", favorites);
  return (
    <>
      <span
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "10px",
        }}
      >
        {favorites.length === 0 ? (
          <div>No Favorites here</div>
        ) : (
          favorites.map((item, index) => (
            <Main key={index} type={item?.types[0].type.name}>
              <img
                style={{ width: "150px", height: "150px" }}
                src={item?.sprites.other.dream_world.front_default}
                alt="pokemon"
              />
              <p
                style={{
                  fontSize: "20px",
                }}
              >
                #{item?.id}
              </p>
              <p>Name: {item?.name.toUpperCase()}</p>
              <p>Type: {item?.types[0].type.name}</p>
              <p>
                {" "}
                <Icon name="heart icon" />: {item?.stats[0].base_stat}
              </p>
            </Main>
          ))
        )}
      </span>
    </>
  );
};

export default Favorites;
