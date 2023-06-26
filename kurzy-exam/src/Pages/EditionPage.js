import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import {
  InputLabel,
  FormControl,
  Select,
  Card,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { blankpicture } from "src/Images";
import styled, { css } from "styled-components";
import { AppContext } from "src/context/AppContext";
import { postData, postNewData } from "src/api/postData";
import { editionSchema } from "src/schemas/editionSchema";
import { Formik, Form, ErrorMessage, Field } from "formik";

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
const EditionInfoWrapper = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 120px;
`;

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
  const [saveAsNewButton, setSaveAsNewButton] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const getAfterTheBattleAndEdit = async () => {
    const response = await axios.get(
      `http://localhost:3001/afterTheBattleAndEdit/`
    );
    setAfterBattle(response.data);
    const getBattleIds = response?.data?.map((item) => item.id);
    setAfterBattleIds(getBattleIds);
  };

  useEffect(() => {
    getAfterTheBattleAndEdit();
  }, [personName]);

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

  const handleOnSubmit = (values) => {
    setNewValues(values);
    if (values === initialValues) {
      setEditButton(false);
      setSaveAsNewButton(false);
      enqueueSnackbar(`Nie dokonałeś zmiany żadnej z wartości`, {
        variant: "error",
        preventDuplicate: true,
        autoHideDuration: 5000,
      });
    }
    if (values !== initialValues) {
      setEditButton(true);
    }
    if (values.name !== initialValues.name) {
      setSaveAsNewButton(true);
    }
    if (
      (values.name !== initialValues.name) &
      (values.height === initialValues.height) &
      (values.baseexp === initialValues.baseexp) &
      (values.weight === initialValues.weight) &
      (values.abilitie === initialValues.abilitie)
    ) {
      setSaveAsNewButton(true);
      setEditButton(false);
    }
  };

  const edit = () => {
    if (!afterBattleIds.includes(newValues.id)) {
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
      setEditButton(false);
      getAfterTheBattleAndEdit();
      setinItialValues({
        id: "",
        pic: blankpicture,
        picDet: "",
        name: "",
        height: "",
        baseexp: "",
        weight: "",
        abilitie: "",
      });

      setPersonName([]);
      enqueueSnackbar(
        `Pokemon o imieniu ${newValues.name} został zmodyfikowany`,
        {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 5000,
        }
      );
    }
    if (afterBattleIds.includes(newValues.id)) {
      axios.delete(
        `http://localhost:3001/afterTheBattleAndEdit/${newValues.id}`
      );
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
      setEditButton(false);
      getAfterTheBattleAndEdit();
      setinItialValues({
        id: "",
        pic: blankpicture,
        picDet: "",
        name: "",
        height: "",
        baseexp: "",
        weight: "",
        abilitie: "",
      });

      setPersonName([]);
      enqueueSnackbar(
        `Pokemon o imieniu ${newValues.name} został zmodyfikowany`,
        {
          variant: "success",
          preventDuplicate: true,
          autoHideDuration: 5000,
        }
      );
    }
  };

  const saveAsNew = () => {
    postNewData(
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
    setSaveAsNewButton(true);
    getAfterTheBattleAndEdit();
    setinItialValues({
      id: "",
      pic: blankpicture,
      picDet: "",
      name: "",
      height: "",
      baseexp: "",
      weight: "",
      abilitie: "",
    });

    setPersonName([]);
    enqueueSnackbar(`Utworzono nowego Pokemona o imieniu ${newValues.name}`, {
      variant: "success",
      preventDuplicate: true,
      autoHideDuration: 5000,
    });
  };

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
  }, [afterBattle, fullPokemonDataFormated, personName]);

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
        validationSchema={editionSchema}
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
                      <ErrorMessage name="name" />
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
                        <ErrorMessage name="height" />
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
                        <ErrorMessage name="baseexp" />
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
                        <ErrorMessage name="weight" />
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
                        <ErrorMessage name="abilitie" />
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
          disabled={editButton === false ? true : false}
        >
          Edytuj
        </MyButton>
        <MyButton
          variant="outlined"
          type="submit"
          onClick={saveAsNew}
          disabled={saveAsNewButton === false ? true : false}
        >
          Zapisz jako nowy
        </MyButton>
      </ButtonWrapper>
      <EditionInfoWrapper>
        Wskazówki:<br></br> - aby dokonać edycji należy zmienić co najmniej
        jeden z parametrów Pokemona,<br></br> - aby było możliwe stworzenie
        nowego Pokemona należy nadać mu unikatowe Imię,<br></br> - nowego
        Pokemona tworzymy modyfikując Pokemona już istniejącego w bazie danych.
      </EditionInfoWrapper>
    </ContainerPageWrapper>
  );
};

export default EditionPage;
