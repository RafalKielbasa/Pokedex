import React from "react";
import axios from "axios";
import { useEffect, useState, useContext, useMemo } from "react";
import { AppContext } from "src/context/AppContext";

import {
  InputLabel,
  FormControl,
  Select,
  Card,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

import styled, { css } from "styled-components";
// import {Input, TextField, MenuItem, MenuList } from "@mui/material";
import {
  Formik,
  Form,
  ErrorMessage,
  Field,
  useFormikContext,
  getIn,
} from "formik";
import { BlankPokemonCard, ArenaPokemonCard } from "../Components/PokemonCards";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { blankpicture } from "src/Images";
import { useSnackbar } from "notistack";
import { postData } from "src/api/postData";

const ContainerPageWrapper = styled("div")(
  css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: top;
    margin-top: 50px;
  `
);

const CardWrapper = styled.div`
  margin-left: 40px;
  margin-bottom: 50px;
`;
const MediaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 60px;
  margin-bottom: 50px;
`;
const CardValuesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled(Form)(
  css`
    display: flex;
  `
);
const EditionWrapper = styled.div`
  display: flex;
  //justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
  margin-bottom: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
const MyButton = styled(Button)(
  css`
    width: 200px;
  `
);

const EditionPage = () => {
  const [afterBattle, setAfterBattle] = useState();
  const [afterBattleIds, setAfterBattleIds] = useState();
  const [expFullPokemonDataFormated, setExpFullPokemonDataFormated] = useState(
    []
  );
  const [personName, setPersonName] = useState([]);
  const [userData, setUsersData] = useState([]);
  const [initialValues, setinItialValues] = useState({
    id: "",
    pic: "",
    picDet: "",
    name: "",
    height: "",
    baseexp: "",
    weight: "",
    abilitie: "",
  });
  const [newValues, setNewValues] = useState(null);
  const {
    theme,
    toggleTheme,
    toggleLoggedIn,
    isLoggedIn,
    isDark,
    isSuccess,
    fullPokemonDataFormated,
  } = useContext(AppContext);
  const [editButton, setEditButton] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeMultiple = (event) => {
    setNewValues(null);
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

  // const wynik = useMemo(() => {
  //   return initialValues === newValues ? true : false;
  // }, [initialValues, newValues]);
  // console.log(`wynik`, wynik);

  const handleOnSubmit = (values) => {
    setNewValues(values);
    if (values === initialValues) {
      setEditButton(false);
      enqueueSnackbar(`Nie dokonałeś zmiany żadnej z wartości`, {
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    }
    if (values !== initialValues) {
      setEditButton(true);
    }
  };

  // console.log(`newValues === initialValues`, newValues === initialValues);
  console.log(`initialValues`, initialValues);
  console.log(`newValues`, newValues);

  const edit = () => {
    // if (fighter1Stat > fighter2Stat && !afterBattleIds.includes(battle[0].id)) {
    postData(
      "afterTheBattleAndEdit",
      newValues.id,
      newValues.pic,
      newValues.picDet,
      newValues.name,
      newValues.height,
      newValues.baseexp,
      newValues.weight,
      newValues.abilitie
    );
    //   axios.delete(`http://localhost:3001/battle/${battle[0].id}`);
    //   axios.delete(`http://localhost:3001/battle/${battle[1].id}`);
    //   setOpen(false);
    //   navigate("/");
    // }
  };

  useEffect(() => {
    const getAfterTheBattleAndEdit = async () => {
      const response = await axios.get(
        `http://localhost:3001/afterTheBattleAndEdit/`
      );
      setAfterBattle(response.data);
      const getBattleIds = response?.data?.map((item) => item.id);
      setAfterBattleIds(getBattleIds);
    };
    getAfterTheBattleAndEdit();
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

  useEffect(() => {
    setinItialValues({
      id: userData?.id,
      pic: userData?.pic,
      picDet: userData?.picDet,
      name: userData?.name,
      height: userData?.height,
      baseexp: userData?.baseexp,
      weight: userData?.weight,
      abilitie: userData?.abilitie,
    });
  }, [userData]);

  return (
    <ContainerPageWrapper>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
      >
        {({ values, handleChange, setFieldValue }) => {
          return (
            <EditionWrapper>
              <FormWrapper>
                <FormControl
                  fullWidth
                  style={{
                    m: 1,
                    minWidth: 200,
                    maxWidth: 300,
                  }}
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
                    style={{
                      height: "130px",
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

                <CardWrapper>
                  <Card
                    style={{
                      backgroundColor: isDark ? "#bcaaa4" : "white",
                      width: 320,
                    }}
                  >
                    <MediaWrapper>
                      <CardMedia style={{ textAlign: "center" }}>
                        {
                          <img
                            src={
                              initialValues.pic !== undefined
                                ? initialValues.pic
                                : blankpicture
                            }
                            alt={"picture"}
                            key={initialValues.id}
                          />
                        }
                      </CardMedia>

                      <Field
                        name="name"
                        placeholder="Imię"
                        value={values.name}
                        onChange={handleChange}
                        style={{
                          textAlign: "center",
                          fontSize: "22px",
                          marginTop: "10px",
                          width: "200px",
                        }}
                      />
                    </MediaWrapper>

                    <CardContentWrapper>
                      <CardValuesWrapper>
                        <Field
                          name="height"
                          placeholder="Wzrost"
                          type="number"
                          value={values.height}
                          onChange={handleChange}
                          style={{
                            textAlign: "center",
                            width: "110px",
                            marginRight: "10px",
                          }}
                        />
                        <Typography
                          style={{
                            fontWeight: "bold",
                            paddingBottom: "30px",
                            marginRight: "10px",
                          }}
                          variant="body2"
                          color="text.secondary"
                        >
                          Height
                        </Typography>

                        <Field
                          name="baseexp"
                          placeholder="Doświadczenie"
                          type="number"
                          value={values.baseexp}
                          onChange={handleChange}
                          style={{
                            textAlign: "center",
                            width: "110px",
                            marginRight: "10px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: "bold", marginRight: "10px" }}
                          variant="body2"
                          color="text.secondary"
                        >
                          Base experience
                        </Typography>
                      </CardValuesWrapper>

                      <CardValuesWrapper>
                        <Field
                          name="weight"
                          placeholder="Waga"
                          type="number"
                          value={values.weight}
                          onChange={handleChange}
                          style={{
                            textAlign: "center",
                            width: "110px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: "bold", paddingBottom: "30px" }}
                          variant="body2"
                          color="text.secondary"
                        >
                          Weight
                        </Typography>
                        <Field
                          name="abilitie"
                          placeholder="Zdolność"
                          type="text"
                          value={values.abilitie}
                          onChange={handleChange}
                          style={{
                            textAlign: "center",
                            width: "110px",
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          variant="body2"
                          color="text.secondary"
                        >
                          Abilitie
                        </Typography>
                      </CardValuesWrapper>
                    </CardContentWrapper>
                    <SubmitButtonWrapper>
                      <MyButton variant="outlined" type="submit">
                        Zapisz zmiany
                      </MyButton>
                    </SubmitButtonWrapper>
                  </Card>
                </CardWrapper>
              </FormWrapper>
            </EditionWrapper>
          );
        }}
      </Formik>
      <ButtonWrapper>
        <MyButton
          variant="outlined"
          type="submit"
          onClick={edit}
          disabled={
            newValues === initialValues ||
            newValues === null ||
            editButton === false
              ? true
              : false
          }
        >
          Edytuj
        </MyButton>
        <MyButton
          variant="outlined"
          type="submit"
          // onClick={edit}
          // disabled={false}
        >
          Zapisz jako nowy
        </MyButton>
      </ButtonWrapper>
    </ContainerPageWrapper>
  );
};

export default EditionPage;
