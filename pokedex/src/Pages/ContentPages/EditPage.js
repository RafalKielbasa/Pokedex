import React, { useState } from "react";
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
  const { data: detailPokemon } = useQuery({
    queryKey: ["pokemon", chosedPokemon],
    queryFn: () => fetchOnePokemon(editedList, chosedPokemon),
    enabled: editedStatus === "success" && chosedPokemon !== "",
    staleTime: 10 * (60 * 1000),
  });
  const initialValue = { base_experience: "" };
  console.log({ detailPokemon, initialValue });
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
      <Formik initialValues={initialValue}>
        {({ isSubmitting, values }) => (
          <Form>
            <div>
              <label htmlFor="base_experience">Doświadczenie bazowe</label>
              <Field name="base_experience" type="text"></Field>
              <ErrorMessage name="base_experience" />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <Field name="email" type="email" placeholder="Wprowadź email" />
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
        )}
      </Formik>
    </>
  );
};

export default EditPage;
