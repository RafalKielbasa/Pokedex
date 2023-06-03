import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { css, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import PokemonCardInfo from "./PokemonCardInfo";

const StyledBox = styled("div")(
  ({ theme }) =>
    css`
      width: 300px;
      height: 400px;
      margin: 25px;
      padding: 20px;
      background-color: ${theme.palette.background.default};
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: 500ms all;
      &:hover {
        opacity: 0.7;
        transform: scale(1.05);
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
    margin-bottom: 10px;
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

class Pokemon {
  constructor(data) {
    this.sprite = data.sprites.other.dream_world.front_default;
    this.ability = data.abilities?.[0]?.ability?.name;
    this.name = data.name;
    this.weight = data.weight;
    this.height = data.height;
    this.id = data.id;
    this.base_experience = data.base_experience;
  }
}

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

  useEffect(() => {
    if (!pokemon) {
      const fetchData = async () => {
        const response = await axios.get(url);
        const poke = new Pokemon(response?.data);

        setPokemonData(poke);
        editPokemonData(poke);
      };

      fetchData();
    } else {
      editPokemonData(pokemon);
    }
  }, [url, editedPokemonList]);

  const editPokemonData = (oldData) => {
    const obj = editedPokemonList?.find((item) => item.id === oldData.id);

    if (obj !== undefined) {
      setPokemonData(obj);
    } else {
      setPokemonData(oldData);
    }
  };

  const handlePokemonCardClick = () => {
    const path = gate
      ? `/EditForm/${pokemonData?.id}`
      : `/Details/${pokemonData?.id}`;
    navigate(path, { state: { pokemonData } });
  };

  return (
    <StyledBox onClick={closebutton ? null : handlePokemonCardClick}>
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
