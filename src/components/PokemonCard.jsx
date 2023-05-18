import axios from "axios";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PokemonCardInfo from "./PokemonCardInfo";

const StyledBox = styled("div")(
  ({ theme }) =>
    css`
      width: 300px;
      height: 400px;
      margin: 2rem;
      padding: 20px;
      background-color: ${theme.palette.background.default};
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: 500ms all;
      &:hover {
        opacity: 0.7;
        transform: scale(1.1);
      }
    `
);

const StyledImgBox = styled("div")(
  css`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  `
);

const Image = styled("img")(
  css`
    width: 200px;
    height: 200px;
  `
);

const StyledTitleBox = styled("div")(
  css`
    margin-bottom: 1rem;
  `
);

const StyledTitle = styled("span")(
  css`
    font-size: 30px;
  `
);

const StyledCloseIcon = styled(CloseIcon)(
  css`
    color: white;
    position: relative;
    left: -150px;
  `
);

const PokemonCard = ({
  url,
  closebutton,
  removeFighter,
  gate,
  pokemon,
  editedPokemonList,
}) => {
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
        editPokemonData(response);
      };

      fetchData();
    } else {
      setPokemonData(pokemon);
    }
  }, [url, editedPokemonList]);

  const editPokemonData = (oldData) => {
    const obj = editedPokemonList?.find((item) => item.id === oldData.data.id);
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
  };

  const handlePokemonCardClick = () => {
    const path = gate
      ? `/EditForm/${pokemonData?.id}`
      : `/Details/${pokemonData?.id || pokemon.id}`;
    navigate(path, { state: { pokemonData } });
  };

  return (
    <StyledBox
      onClick={closebutton ? null : handlePokemonCardClick}
      theme={theme}
    >
      {closebutton ? <StyledCloseIcon onClick={removeFighter} /> : null}
      <StyledImgBox>
        <Image src={pokemonData?.sprite} />
      </StyledImgBox>

      <StyledTitleBox>
        <StyledTitle>{pokemonData?.name}</StyledTitle>
      </StyledTitleBox>

      <PokemonCardInfo pokemonData={pokemonData} />
    </StyledBox>
  );
};

export default PokemonCard;
