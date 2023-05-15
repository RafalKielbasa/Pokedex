import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StyledBox = styled.div`
  width: 300px;
  height: 400px;
  margin: 2rem;

  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: blue;
    opacity: 0.9;
    transform: scale(1.01);
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

const StyledDetailsBox = styled.div`
  margin: 0px;
  padding: 0px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const StyledDetail = styled.div`
  margin: 0;
  padding: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledMiniTitle = styled.span`
  font-size: 12px;
  font-family: cursive;
  font-weight: lighter;
`;

const StyledBigTitle = styled.span`
  font-size: 16px;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
`;

function Card({ url, closebutton, removeFighter, gate, newCard }) {
  const [pokemonData, setPokemonData] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url);
      setPokemonData(response.data);
      newCard === true ? fetchAddedPokemon(response) : fetchNewData(response);
    };

    fetchData();
  }, [url]);

  const fetchNewData = async (oldData) => {
    await axios
      .get(`http://localhost:3001/pokemon`)
      .then((response) => {
        const obj = response.data.find((item) => item.id === oldData.data.id);
        console.log("obj", obj);
        if (obj !== undefined) {
          const updatedPokemonData = {
            ...oldData.data,
            name: obj.name,
            weight: obj.weight,
            height: obj.height,
            base_experience: obj.base_experience,
            ability: obj?.abilities?.[0]?.ability?.name,
          };
          setPokemonData(updatedPokemonData);
        } else {
          return;
        }
      })
      .catch((error) => {});
  };

  const fetchAddedPokemon = async (oldData) => {
    await axios
      .get(`http://localhost:3001/newPokemon`)
      .then((response) => {
        const obj = response.data.find((item) => item.id === oldData.data.id);

        if (obj !== undefined) {
          const updatedPokemonData = {
            ...oldData.data,
            name: obj.name,
            weight: obj.weight,
            height: obj.height,
            base_experience: obj.base_experience,
          };
          setPokemonData(updatedPokemonData);
        } else {
          return;
        }
      })
      .catch((error) => {});
  };

  const handleClick = () => {
    if (!pokemonData) return;
    const path = gate
      ? `/EditForm/${pokemonData?.id}`
      : `/Details/${pokemonData?.id}`;
    navigate(path, { state: { pokemonData } });
  };

  return (
    <StyledBox
      onClick={closebutton ? null : handleClick}
      style={{ backgroundColor: theme.palette.background.default }}
    >
      {closebutton === true ? (
        <CloseIcon
          style={{ color: "white", position: "relative", left: "-135" }}
          onClick={removeFighter}
        />
      ) : null}
      <StyledImgBox>
        <Image src={pokemonData?.sprites.other.dream_world.front_default} />
      </StyledImgBox>
      <StyledTitleBox>
        <StyledTitle className="title">{pokemonData?.name}</StyledTitle>
      </StyledTitleBox>

      <StyledDetailsBox>
        <StyledDetail>
          <StyledMiniTitle>{pokemonData?.weight}</StyledMiniTitle>
          <StyledBigTitle>weight</StyledBigTitle>
        </StyledDetail>
        <StyledDetail>
          <StyledMiniTitle>
            {pokemonData?.abilities?.[0]?.ability?.name}
          </StyledMiniTitle>
          <StyledBigTitle>abilitie</StyledBigTitle>
        </StyledDetail>
        <StyledDetail>
          <StyledMiniTitle>{pokemonData?.height}</StyledMiniTitle>
          <StyledBigTitle>height</StyledBigTitle>
        </StyledDetail>
        <StyledDetail>
          <StyledMiniTitle>{pokemonData?.base_experience}</StyledMiniTitle>
          <StyledBigTitle>base experience</StyledBigTitle>
        </StyledDetail>
      </StyledDetailsBox>
    </StyledBox>
  );
}

export default Card;
