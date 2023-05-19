import React, { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { allPokemonNamesList, fetchOnePokemon } from "src/api";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const EditPage = () => {
  const { editedList, editedStatus } = useOutletContext();
  const { data: pokemonDataToEdit } = useQuery({
    queryKey: ["pokemonsToFilter"],
    queryFn: () => allPokemonNamesList(),
    staleTime: 10 * (60 * 1000),
  });
  const [chosedPokemon, setChosedPokemon] = useState("");
  const [initialValues, setInitialValues] = useState({
    name: "",
    base_experience: "",
    ability_name: "",
  });
  const { data: detailPokemon, status } = useQuery({
    queryKey: ["pokemon", chosedPokemon],
    queryFn: () => fetchOnePokemon(editedList, chosedPokemon),
    enabled: editedStatus === "success" && chosedPokemon !== "",
    staleTime: 10 * (60 * 1000),
  });
  console.log({ detailPokemon });
  useEffect(() => {
    if (status === "success" && chosedPokemon !== "") {
      setInitialValues({
        name: detailPokemon?.name,
        base_experience: detailPokemon?.base_experience,
        ability_name: detailPokemon?.abilities[0]?.ability?.name,
      });
    }
  }, [
    status,
    chosedPokemon,
    detailPokemon?.base_experience,
    detailPokemon?.abilities,
    detailPokemon?.name,
  ]);

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
      <Formik initialValues={initialValues} enableReinitialize={true}>
        {({ isSubmitting, values }) => (
          <>
            {console.log(values)}
            <Form>
              <div>
                <label htmlFor="name">Nazwa Pokemona</label>
                <Field name="name" type="text" value={values?.name}></Field>
                <ErrorMessage name="name" />
              </div>
              <div>
                <label htmlFor="base_experience">Doświadczenie bazowe</label>
                <Field
                  name="base_experience"
                  type="number"
                  value={values?.base_experience}
                ></Field>
                <ErrorMessage name="base_experience" />
              </div>
              <div>
                <label htmlFor="ability">Ability name</label>
                <Field
                  name="ability"
                  type="text"
                  value={values?.ability_name}
                />
                <ErrorMessage name="email" />
              </div>
              <div>
                <label htmlFor="password">Hasło</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Wprowadź hasło"
                />
                <ErrorMessage name="password" />
              </div>
              <div>
                <label htmlFor="repeatPassword">Powtórz Hasło</label>
                <Field
                  name="repeatPassword"
                  type="password"
                  placeholder="Powtórz hasło"
                />
                <ErrorMessage name="repeatPassword" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Edytuj
              </button>
              <button type="submit" disabled={isSubmitting}>
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
