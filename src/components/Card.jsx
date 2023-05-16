import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PokemonDetailsBox from "./PokemonDetailsBox";

const StyledBox = styled.div`
  width: 300px;
  height: 400px;
  margin: 2rem;

  padding: 20px;

  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 800ms all;
  &:hover {
    background-color: blue;
    opacity: 0.9;
    transform: scale(1.1);
  }
`;

const StyledImgBox = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const StyledTitleBox = styled.div`
  margin-bottom: 1rem;
`;

const StyledTitle = styled.span`
  font-size: 30px;
`;

const Card = ({ url, closebutton, removeFighter, gate, pokemon }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (!pokemon) {
      const fetchData = async () => {
        const response = await axios.get(url);

        const objPokemon = {
          sprite: response.data.sprites.other.dream_world.front_default,
          ability: response.data.abilities?.[0]?.ability?.name,
          name: response.data.name,
          weight: response.data.weight,
          height: response.data.height,
          id: response.data.id,
          base_experience: response.data.base_experience,
        };

        setPokemonData(objPokemon);
        fetchNewData(response);
      };

      fetchData();
    } else {
      setPokemonData(pokemon);
    }
  }, [url]);

  const fetchNewData = (oldData) => {
    axios
      .get(`http://localhost:3001/editedPokemon`)
      .then((response) => {
        const obj = response.data.find((item) => item.id === oldData.data.id);
        if (obj !== undefined) {
          const updatedPokemonData = {
            ...oldData.data,
            name: obj.name,
            weight: obj.weight,
            height: obj.height,
            base_experience: obj.base_experience,
            ability: obj?.ability,
            sprite: obj?.sprite,
          };
          setPokemonData(updatedPokemonData);
        } else {
          return;
        }
      })
      .catch((error) => {});
  };

  const handleClick = () => {
    const path = gate
      ? `/EditForm/${pokemonData?.id}`
      : `/Details/${pokemonData?.id || pokemon.id}`;
    navigate(path, { state: { pokemonData } });
  };

  return (
    <StyledBox
      onClick={closebutton ? null : handleClick}
      style={{ backgroundColor: theme.palette.background.default }}
    >
      {closebutton ? (
        <CloseIcon
          style={{ color: "white", position: "relative", left: "-135" }}
          onClick={removeFighter}
        />
      ) : null}
      <StyledImgBox>
        <Image src={pokemonData?.sprite} />
      </StyledImgBox>

      <StyledTitleBox>
        <StyledTitle className="title">{pokemonData?.name}</StyledTitle>
      </StyledTitleBox>

      <PokemonDetailsBox pokemonData={pokemonData} />
    </StyledBox>
  );
};

export default Card;
