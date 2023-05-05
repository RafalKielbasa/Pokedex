import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "@mui/material";

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

const StyledImgBox = styled.div``;

const Image = styled.img`
  width: auto;
  max-width: 120px;
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

function Card({ url }) {
  const [pokemonData, setPokemonData] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url);
      setPokemonData(response.data);
    };
    fetchData();
  }, [url]);

  const handleClick = () => {
    navigate(`/Details/${pokemonData?.id}`, {
      state: { pokemonData, otherState: "asdas" },
    });
  };
  return (
    <StyledBox
      onClick={handleClick}
      style={{ backgroundColor: theme.palette.background.default }}
    >
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
