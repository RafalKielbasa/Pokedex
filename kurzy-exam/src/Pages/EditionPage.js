import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "src/context/AppContext";
// import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled, { css } from "styled-components";
import { Button, Input, TextField, MenuItem, MenuList } from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { BlankPokemonCard, ArenaPokemonCard } from "../Components/PokemonCards";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

const CardsWrapper = styled.div`
  margin-left: 40px;
  margin-bottom: 50px;
`;

const ContainerPageWrapper = styled("div")(
  css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: top;
    margin-top: 50px;
    // height: 100vh;
  `
);
const FormWrapper = styled(Form)(
  css`
    display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-direction: column;
    // gap: 15px;
    // border: 1px solid black;
    // border-radius: 10px;
    //padding: 50px;
    // width: 313px;
  `
);
const EditionWrapper = styled.div`
  display: flex;
  //justify-content: center;
  align-items: center;
  flex-direction: column;
  // gap: 15px;
  // border: 1px solid black;
  // border-radius: 10px;
  //padding: 50px;
  // width: 313px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  // justify-content: center;
  // align-items: center;
  flex-direction: row;
  gap: 50px;
  // border: 1px solid black;
  // border-radius: 10px;
  //padding: 50px;
  // width: 313px;
`;

// const MyButton = styled(Button)(
//   css`
//     // display: flex;
//     // justify-content: center;
//     // align-items: center;
//     // flex-direction: row;
//     // gap: 15px;
//     // border: 1px solid black;
//     // border-radius: 10px;
//     // padding: 50px;
//     // width: 313px;
//     margin-left: 50px;
//   `
// );

const EditionPage = () => {
  const [afterBattle, setAfterBattle] = useState();
  const [afterBattleIds, setAfterBattleIds] = useState();
  const [expFullPokemonDataFormated, setExpFullPokemonDataFormated] = useState(
    []
  );
  const [personName, setPersonName] = useState(["bulbasaur"]);
  const [userData, setUsersData] = useState([]);
  const [initialValues, setinItialValues] = useState("bulbasaur");

  const {
    theme,
    toggleTheme,
    toggleLoggedIn,
    isLoggedIn,
    isDark,
    isSuccess,
    fullPokemonDataFormated,
  } = useContext(AppContext);

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
        const getuserData = expFullPokemonDataFormated.find(
          (user) => user.name === options[i].value
        );
        setUsersData(getuserData);
      }
    }
    setPersonName(value);
  };

  console.log(`personName`, personName);

  const handleOnSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    const getAfterTheBattle = async () => {
      const response = await axios.get(`http://localhost:3001/afterTheBattle/`);
      setAfterBattle(response.data);
      const getBattleIds = response?.data?.map((item) => item.id);
      setAfterBattleIds(getBattleIds);
    };
    getAfterTheBattle();
  }, []);

  useEffect(() => {
    const array =
      isSuccess &&
      fullPokemonDataFormated?.filter((fPDelem) => {
        return afterBattleIds?.some((fIele) => {
          return fPDelem?.id === fIele;
        });
      });
    const filterFPD = fullPokemonDataFormated?.filter(
      (n) => !array?.includes(n)
    );
    const getExpFPD =
      afterBattle === undefined
        ? []
        : afterBattle.concat(filterFPD).sort((a, b) => (a.id > b.id ? 1 : -1));
    setExpFullPokemonDataFormated(getExpFPD);
  }, [afterBattle, fullPokemonDataFormated]);

  // console.log(`expFullPokemonDataFormated`, expFullPokemonDataFormated[0]);

  console.log(`initialValues`, initialValues);

  useEffect(() => {
    setinItialValues({
      name: userData.name,
      // pic: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      // weight: pokemonData?.weight || "",
      // ability: pokemonData?.ability || "",
      // height: pokemonData?.height || "",
      // baseExperience: pokemonData?.base_experience || "",
    });
  }, [userData]);

  return (
    <ContainerPageWrapper>
      <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
        {({ values, handleChange, handleSubmit }) => {
          return (
            <EditionWrapper>
              <FormWrapper onSubmit={handleSubmit}>
                <FormControl
                  fullWidth
                  style={{ m: 1, minWidth: 200, maxWidth: 300 }}
                >
                  <InputLabel shrink htmlFor="select-multiple-native">
                    Wybierz Pokemona do edycji
                  </InputLabel>
                  <Select
                    multiple
                    native
                    value={personName}
                    onChange={handleChangeMultiple}
                    label="Wybierz Pokemona do edycji"
                    inputProps={{
                      id: "select-multiple-native",
                    }}
                  >
                    {expFullPokemonDataFormated?.map((item) => (
                      <option
                        style={{
                          textAlign: "center",
                        }}
                        key={item.id}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <CardsWrapper>
                  <Card
                    style={{
                      backgroundColor: isDark ? "#bcaaa4" : "white",
                      width: 320,
                    }}
                  >
                    <CardMedia style={{ textAlign: "center" }}>
                      {/* <img src={pic} alt={"picture"} key={id} /> */}
                    </CardMedia>

                    <Field
                      name="name"
                      placeholder="name"
                      style={{ textAlign: "center" }}
                    >
                      {/* {name} */}
                    </Field>

                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {/* {height} */}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "bold", paddingBottom: "20px" }}
                          variant="body2"
                          color="text.secondary"
                        >
                          Height
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {/* {baseexp} */}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          variant="body2"
                          color="text.secondary"
                        >
                          Base experience
                        </Typography>
                      </CardContent>

                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {/* {weight} */}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "bold", paddingBottom: "20px" }}
                          variant="body2"
                          color="text.secondary"
                        >
                          Weight
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {/* {abilitie} */}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          variant="body2"
                          color="text.secondary"
                        >
                          Abilitie
                        </Typography>
                      </CardContent>
                    </CardContent>

                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    ></CardActions>
                  </Card>
                </CardsWrapper>
              </FormWrapper>
              <ButtonWrapper>
                <Button
                  variant="outlined"
                  type="submit"
                  style={{ width: "175px" }}
                >
                  Edytuj
                </Button>
                <Button variant="outlined" type="submit">
                  Zapisz jako nowy
                </Button>
              </ButtonWrapper>
            </EditionWrapper>
          );
        }}
      </Formik>
    </ContainerPageWrapper>
  );
};

export default EditionPage;
