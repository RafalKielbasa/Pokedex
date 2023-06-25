import React, { useContext } from "react";
import { GlobalContext } from "./context/global";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { typeColor } from "./typeColor";

const Card = styled.div`
  border-radius: 6px;
  width: 300px;
  height: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ swich, type }) =>
    swich ? "#212A3E" : typeColor(type)};
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: auto;
  opacity: ${({ isLoser }) => (isLoser ? 0.5 : 1)};
  color: ${({ swich }) => (swich ? "white" : "black")};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const TypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  justify-items: center;
  align-items: center;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
`;

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();
  const { loser, swich } = useContext(GlobalContext);

  const handleClick = () => {
    navigate("/moreinfo", { state: { pokemon } });
  };

  const isLoser = loser && loser.includes(pokemon.name);

  return (
    <Card
      type={pokemon.type}
      onClick={handleClick}
      isLoser={isLoser}
      swich={swich}
    >
      <Image src={pokemon.img} alt={pokemon.name} />
      <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
      <TypesGrid>
        <p>Weight: {pokemon.weight}</p>
        <p>Height: {pokemon.height}</p>
        <p>Ability: {pokemon.ability}</p>
        <p>Base Exp: {pokemon.base_exp}</p>
      </TypesGrid>
    </Card>
  );
};

export default PokemonCard;
