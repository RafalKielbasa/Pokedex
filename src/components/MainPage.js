import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import styled from "styled-components";

const Main = styled.div`
  background-color: lightgreen;
  width: 300px;
  height: 400px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MainPage = () => {
  const [pokenumber, setNumber] = useState(1);

  const handleClick = () => {
    const number = Math.floor(Math.random() * 100);
    setNumber(number);
  };
  const { data, isLoading, error } = useQuery(
    ["pokemon", pokenumber],
    async () => {
      const number = Math.floor(Math.random() * 100);
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
    <>
      <Main>
        <img
          style={{ width: "150px", height: "150px" }}
          src={data?.sprites.other.dream_world.front_default}
          alt="pokemon"
        />
        <p>{data?.name}</p>
        <p>Type: {data?.types[0].type.name}</p>
        <p>HP: {data?.stats[0].base_stat}</p>
        <button onClick={() => handleClick()}>CLICK</button>
      </Main>
    </>
  );
};
