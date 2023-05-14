import { Formik, Form, Field } from "formik";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useSnackbar } from "notistack";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";

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
const HomeButton = styled.button`
  border: 1px solid red;
  margin-left: 40px;
  width: 30vw;
  color: red;

  cursor: pointer;
  font-size: 30px;
`;

const SubmitButton = styled.button`
  border: 1px solid red;
  width: 40vw;
  margin-right: 5px;
  color: red;
  cursor: pointer;
  font-size: 20px;
`;

const SaveButton = styled.button`
  border: 1px solid red;
  width: 25vw;
  margin-top: 5px;
  color: red;
  cursor: pointer;
  font-size: 20px;
`;

export default function EditForm() {
  const location = useLocation();
  const pokemonData = location.state?.pokemonData;
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [newValues, setNewValues] = useState(null);
  const [disp, setDisp] = useState(false);

  const initialValues = {
    pokemonName: pokemonData?.name || "",
    weight: pokemonData?.weight || "",
    ability: pokemonData?.abilities?.[0]?.ability?.name || "",
    height: pokemonData?.height || "",
    baseExperience: pokemonData?.base_experience || "",
  };

  const handleSubmit = (values) => {
    setNewValues(values);
    setDisp(!disp);
  };

  const editPokemon = () => {
    handleClick("Edited old Card", "success");
    axios
      .post(`http://localhost:3001/pokemon/`, {
        id: pokemonData?.id,
        sprite: pokemonData?.sprites.other.dream_world.front_default,
        name: newValues.pokemonName,
        weight: newValues.weight,
        ability: newValues.ability,
        height: newValues.height,
        base_experience: newValues.baseExperience,
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 500) {
          axios.put(`http://localhost:3001/pokemon/${pokemonData?.id}`, {
            id: pokemonData?.id,
            sprite: pokemonData?.sprites.other.dream_world.front_default,
            name: newValues.pokemonName,
            weight: newValues.weight,
            ability: newValues.ability,
            height: newValues.height,
            base_experience: newValues.baseExperience,
          });
        }
      });
  };

  const addNewPokemon = () => {
    console.log("nooooowe", newValues);
    handleClick("added new Card", "success");
    axios
      .post(`http://localhost:3001/newPokemon/`, {
        id: pokemonData?.id,
        sprite: pokemonData?.sprites.other.dream_world.front_default,
        name: newValues.pokemonName,
        weight: newValues.weight,
        ability: newValues.ability,
        height: newValues.height,
        base_experience: newValues.baseExperience,
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  };

  const handleClick = (text, type) => {
    enqueueSnackbar(text, { variant: type });
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
              <SubmitButton type="submit">
                zapisz zmiany w formularzu{" "}
              </SubmitButton>
            </PokemonCard>
          </Form>
        )}
      </Formik>
      <SaveButton
        onClick={addNewPokemon}
        type="submit"
        style={{ display: disp === true ? null : "none" }}
      >
        save as new
      </SaveButton>
      <SaveButton
        onClick={editPokemon}
        type="submit"
        style={{ display: disp === true ? null : "none" }}
      >
        Edit
      </SaveButton>
    </Container>
  );
}
