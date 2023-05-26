import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { editedCreatedPostData } from "src/api/postDataFunctions";
import {
  fetchPokemonNamesList,
  fetchOnePokemon,
} from "src/api/fetchDataFunctions";
import {
  MyTextField,
  StyledSubmitButton,
  FormContainer,
  FormHeader,
  SelectPokemon,
} from "src/components";
import { useOutletContext } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { editValidationSchema } from "src/validationSchemas";

const EditPage = () => {
  const queryClient = useQueryClient();
  const { editedList, editedStatus } = useOutletContext();
  const { data: pokemonDataToEdit } = useQuery({
    queryKey: ["AllPokemonsNamesList"],
    queryFn: () => fetchPokemonNamesList(editedList),
    staleTime: 10 * (60 * 1000),
  });
  const [action, setAction] = useState(null);
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
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values.name);
        editedCreatedPostData(values, values?.name, editedList, action);
        setSubmitting(false);
        setAction(null);
        queryClient.setQueryData(["editedPokemons"], (prev) => [
          ...prev,
          values?.name,
        ]);
        resetForm({
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
        enqueueSnackbar("Operacja zakończona sukcesem", {
          variant: "success",
        });
      }}
    >
      {({ isSubmitting, values }) => (
        <FormContainer>
          <FormHeader value={"Wybierz pokemona do edycji/ lub stwórz nowego"} />
          <SelectPokemon
            pokemonDataToEdit={pokemonDataToEdit}
            setChosedPokemon={setChosedPokemon}
          />
          <Form>
            <MyTextField name="name" label="Nazwa Pokemona" type="text" />
            <MyTextField
              name="base_experience"
              label="Doświadczenie bazowe"
              type="number"
            />
            <MyTextField
              name="abilities[0].ability.name"
              label="Nazwa umiejętności"
              type="text"
            />
            <MyTextField
              name="height"
              label="Wysokość pokemona"
              type="number"
            />
            <MyTextField
              name="height"
              label="Wysokość pokemona"
              type="number"
            />
            <MyTextField name="weight" label="Waga pokemona" type="number" />
            <StyledSubmitButton
              value={"Edytuj Pokemona"}
              disableConditions={
                values?.name === "" ||
                isSubmitting ||
                (values?.name !== "" &&
                  !pokemonDataToEdit.includes(values?.name))
              }
              onClickActionsOtherThanSubmit={() => setAction("edit")}
            />
            <StyledSubmitButton
              value={"Stwórz Nowego Pokemona"}
              disableConditions={
                values?.name === "" ||
                isSubmitting ||
                (values?.name !== "" &&
                  pokemonDataToEdit.includes(values?.name))
              }
              onClickActionsOtherThanSubmit={() => setAction("create")}
            />
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default EditPage;
