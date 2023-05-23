import React, { useEffect, useState, useContext } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { editedCreatedPostData } from "src/api/postDataFunctions";
import {
  fetchPokemonNamesList,
  fetchOnePokemon,
} from "src/api/fetchDataFunctions";
import { StyledFormField, StyledValidationError } from "src/Pages/components";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { enqueueSnackbar } from "notistack";
import { editValidationSchema } from "src/validationSchemas";
import GlobalContext from "src/context/GlobalContext";
const FormRowContainer = styled.div`
  display: flex;
  width: 600px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;
const FormHeader = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
const FormContainer = styled.div`
  min-height: 82.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${(prop) => prop.theme.bgColor});
  color: ${(prop) => prop.theme.textColor};
`;
const StyledButton = styled.button`
  margin-top: 30px;
  margin-bottom: 15px;
  width: 45%;
  height: 12%;
  font-size: 24px;
`;
const EditPage = () => {
  const { theme } = useContext(GlobalContext);
  const { editedList, editedStatus } = useOutletContext();
  const { data: pokemonDataToEdit } = useQuery({
    queryKey: ["AllPokemonsNamesList"],
    queryFn: () => fetchPokemonNamesList(),
    staleTime: 10 * (60 * 1000),
  });
  const [chosedPokemon, setChosedPokemon] = useState("");
  const [initialValues, setInitialValues] = useState({
    abilities: [
      {
        ability: {
          name: "",
        },
      },
    ],
    base_experience: "",
    height: "",
    id: "",
    name: "",
    sprites: "",
    weight: "",
  });
  const { data: detailPokemon, status } = useQuery({
    queryKey: ["pokemon", chosedPokemon],
    queryFn: () => fetchOnePokemon(editedList, chosedPokemon),
    enabled: editedStatus === "success" && chosedPokemon !== "",
    staleTime: 10 * (60 * 1000),
  });
  useEffect(() => {
    if (status === "success" && chosedPokemon !== "") {
      const { abilities, base_experience, height, id, name, sprites, weight } =
        detailPokemon;
      setInitialValues({
        abilities,
        base_experience,
        height,
        id,
        name,
        sprites,
        weight,
      });
    }
  }, [status, chosedPokemon, detailPokemon]);
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={editValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Jestem Kliknięty");
        editedCreatedPostData(values, values?.name);
        setSubmitting(false);
        enqueueSnackbar("Operacja zakończona sukcesem", {
          variant: "success",
        });
      }}
    >
      {({ isSubmitting, values }) => (
        <FormContainer theme={theme}>
          <FormHeader>
            <label htmlFor="chooseEditPokemon">
              Wybierz pokemona do edycji/ lub stwórz nowego
            </label>
            <select
              name="chooseEditPokemon"
              type="text"
              defaultValue={""}
              onChange={(e) => setChosedPokemon(e.target.value)}
            >
              <>
                <option value=""></option>
                {pokemonDataToEdit?.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </>
            </select>
          </FormHeader>
          <Form>
            <FormRowContainer>
              <label htmlFor="name">Nazwa Pokemona</label>
              <Field
                name="name"
                type="text"
                value={values?.name}
                as={StyledFormField}
              ></Field>
              <ErrorMessage name="name" component={StyledValidationError} />
            </FormRowContainer>
            <FormRowContainer>
              <label htmlFor="base_experience">Doświadczenie bazowe</label>
              <Field
                name="base_experience"
                type="number"
                value={values?.base_experience}
                as={StyledFormField}
              ></Field>
              <ErrorMessage
                name="base_experience"
                component={StyledValidationError}
              />
            </FormRowContainer>
            <FormRowContainer>
              <label htmlFor="abilities">Ability name</label>
              <Field
                name="abilities[0].ability.name"
                type="text"
                value={values?.abilities[0]?.ability?.name}
                as={StyledFormField}
              />
              <ErrorMessage
                name="abilities[0].ability.name"
                component={StyledValidationError}
              />
            </FormRowContainer>
            <FormRowContainer>
              <label htmlFor="height">Wysokość pokemona</label>
              <Field name="height" type="number" as={StyledFormField} />
              <ErrorMessage name="height" />
            </FormRowContainer>
            <FormRowContainer>
              <label htmlFor="weight">Waga Pokemona</label>
              <Field name="weight" type="number" as={StyledFormField} />
              <ErrorMessage name="weight" component={StyledValidationError} />
            </FormRowContainer>
            <FormRowContainer>
              <StyledButton
                type="submit"
                disabled={
                  values?.name === "" ||
                  isSubmitting ||
                  (values?.name !== "" && values?.name !== chosedPokemon)
                }
              >
                Edytuj Pokemona
              </StyledButton>
              <StyledButton
                type="submit"
                disabled={
                  values?.name === "" ||
                  isSubmitting ||
                  (values?.name !== "" && values?.name === chosedPokemon)
                }
              >
                Stwórz Nowego Pokemona
              </StyledButton>
            </FormRowContainer>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default EditPage;
