import { Formik, Form, Field } from "formik";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SportsMmaRoundedIcon from "@mui/icons-material/SportsMmaRounded";
import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "@mui/material";
import { useSnackbar } from "notistack";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PokemonCard = styled.div`
  max-width: 80vw;
  min-height: 50vh;
  margin: 2rem;

  &:hover {
    transform: scale(1.01);
  }
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 600px) {
    width: 100px;
    height: 100px;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  @media screen and (max-width: 600px) {
    width: 100px;
    height: 100px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-size: 3rem;
  font-weight: bold;

  margin: 0 auto;
`;

const HeartIcon = styled(FavoriteRoundedIcon)`
  margin-left: 5px;
  color: ${({ isToggled }) => (isToggled ? "red" : "white")};

  cursor: pointer;
`;

const SportsIcon = styled(SportsMmaRoundedIcon)`
  color: white;
  color: ${({ isToggledBattle }) => (isToggledBattle ? "red" : "white")};
  margin-left: 5px;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    margin: 0px;
    padding: 0px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

const InfoBox = styled.div`
  margin: 0;
  padding: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 600px) {
    margin: 0;
    padding: 0;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const MiniTitle = styled.span`
  font-size: 15px;
  font-family: cursive;
  font-weight: lighter;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const BigTitle = styled.span`
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    font-size: 15px;
  }
`;

const BackButton = styled(Link)`
  border: 1px solid red;
  width: 40vw;

  color: red;
  margin: 1rem auto;
`;

export default function EditForm() {
  const location = useLocation();
  const pokemonData = location.state?.pokemonData;
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const initialValues = {
    pokemonName: pokemonData?.name || "",
    weight: pokemonData?.weight || "",
    ability: pokemonData?.abilities?.[0]?.ability?.name || "",
    height: pokemonData?.height || "",
    baseExperience: pokemonData?.base_experience || "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Container
      style={{
        backgroundColor: theme.palette.background.contrast,
        height: "100vh",
      }}
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <PokemonCard
              style={{ backgroundColor: theme.palette.background.default }}
            >
              <ImageContainer>
                <Image
                  src={pokemonData?.sprites.other.dream_world.front_default}
                />
              </ImageContainer>
              <ContentContainer>
                <InfoBox>
                  <MiniTitle>Name</MiniTitle>
                  <Field type="text" name="pokemonName" />
                </InfoBox>

                <InfoContainer>
                  <InfoBox>
                    <MiniTitle>Weight</MiniTitle>
                    <Field type="number" name="weight" />
                  </InfoBox>
                  <InfoBox>
                    <MiniTitle>Abilities</MiniTitle>
                    <Field type="text" name="ability" />
                  </InfoBox>
                  <InfoBox>
                    <MiniTitle>Height</MiniTitle>
                    <Field type="number" name="height" />
                  </InfoBox>
                  <InfoBox>
                    <MiniTitle>BaseExperience</MiniTitle>
                    <Field type="number" name="baseExperience" />
                  </InfoBox>
                </InfoContainer>
              </ContentContainer>
            </PokemonCard>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
