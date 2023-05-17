import { Form, Formik, Field, ErrorMessage } from "formik";
import React from "react";

const EditPage = ({ pokemonQueries }) => {
  const pokemonNames = pokemonQueries?.map((value) => value?.data?.data?.name);
  console.log(pokemonNames);
  return (
    <Formik initialValues={{ chooseEditPokemon: "" }}>
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="chooseEditPokemon">
              Wybierz pokemona do edycji
            </label>
            <Field name="chooseEditPokemon" type="text" as="select">
              {pokemonNames?.map((name) => (
                <option value={name}>{name}</option>
              ))}
            </Field>
            <ErrorMessage name="userName" />
          </div>
          <div>
            <label htmlFor="base_experience">Doświadczenie bazowe</label>
            <Field name="base_experience" type="text"></Field>
            <ErrorMessage name="userName" />
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
  );
};

export default EditPage;
