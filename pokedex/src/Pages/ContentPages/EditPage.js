import React, { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { editedCreatedPostData } from "src/api/postDataFunctions";
import { fetchPokemonNamesList, fetchOnePokemon } from "src/api/fetchDataFunctions";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as Yup from "yup";
import { enqueueSnackbar } from "notistack";
const EditPage = () => {
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
      const { abilities, base_experience, height, id, name, sprites, weight } = detailPokemon;
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
    <>
      <div>
        <label htmlFor="chooseEditPokemon">Wybierz pokemona do edycji</label>
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
      </div>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Yup.object({
          name: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
          base_experience: Yup.number().integer().positive().required("Required"),
          height: Yup.number().integer().positive().required("Required"),
          weight: Yup.number().integer().positive().required("Required"),
        })}
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
          <>
            <Form>
              <div>
                <label htmlFor="name">Nazwa Pokemona</label>
                <Field name="name" type="text" value={values?.name}></Field>
                <ErrorMessage name="name" />
              </div>
              <div>
                <label htmlFor="base_experience">Doświadczenie bazowe</label>
                <Field name="base_experience" type="number" value={values?.base_experience}></Field>
                <ErrorMessage name="base_experience" />
              </div>
              <div>
                <label htmlFor="abilities">Ability name</label>
                <Field
                  name="abilities[0].ability.name"
                  type="text"
                  value={values?.abilities[0]?.ability?.name}
                />
                <ErrorMessage name="abilities[0].ability.name" />
              </div>
              <div>
                <label htmlFor="height">Wysokość pokemona</label>
                <Field name="height" type="number" />
                <ErrorMessage name="height" />
              </div>
              <div>
                <label htmlFor="weight">Waga Pokemona</label>
                <Field name="weight" type="number" />
                <ErrorMessage name="weight" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || (values?.name !== "" && values?.name !== chosedPokemon)}
              >
                Edytuj Pokemona
              </button>
              <button
                type="submit"
                disabled={isSubmitting || (values?.name !== "" && values?.name === chosedPokemon)}
              >
                Stwórz Nowego Pokemona
              </button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default EditPage;
