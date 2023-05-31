import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

function Settings() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pokemonData) {
      return;
    }

    axios
      .get("http://localhost:4100/pokemonData")
      .then((response) => {
        setPokemonData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Wystąpił błąd podczas pobierania danych:", error);
        setLoading(false);
      });
  }, [pokemonData]);

  const handleEditPokemon = (editedPokemon, isCreateNew) => {
    if (isCreateNew) {
      const newPokemon = {
        name: editedPokemon.name,
        height: editedPokemon.height,
        weight: editedPokemon.weight,
        base_experience: editedPokemon.base_experience,
        ability: editedPokemon.ability,
        wins: 0,
        loses: 0,
      };

      axios
        .post("http://localhost:4100/pokemonData", newPokemon)
        .then((response) => {
          console.log("Nowy pokemon został zapisany:", response.data);
          setPokemonData([...pokemonData, response.data]);
        })
        .catch((error) => {
          console.error(
            "Wystąpił błąd podczas zapisywania nowego pokemona:",
            error
          );
        });
    } else {
      const updatedPokemon = {
        ...editedPokemon,
        wins: 0,
        loses: 0,
      };

      axios
        .put(
          `http://localhost:4100/pokemonData/${updatedPokemon.id}`,
          updatedPokemon
        )
        .then((response) => {
          console.log("Dane zostały zaktualizowane:", response.data);
        })
        .catch((error) => {
          console.error("Wystąpił błąd podczas aktualizacji danych:", error);
        });
    }
  };
  return (
    <MainLayout>
      <div className="settings">
        <h1 className="pokeEditingH1">Edycja Pokemonów</h1>

        <div className="pokeEditing">
          {pokemonData.map((pokemon) => (
            <div className="pokeEditingCard" key={pokemon.id}>
              <h2 className="pokeEditingName">{pokemon.name}</h2>

              <Formik
                initialValues={{
                  id: pokemon.id,
                  name: pokemon.name,
                  height: pokemon.height,
                  weight: pokemon.weight,
                  base_experience: pokemon.base_experience,
                  ability: pokemon.ability,
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleEditPokemon(values, false);
                  setSubmitting(false);
                }}
              >
                {({ handleChange, handleSubmit, values }) => (
                  <Form>
                    <div className="poke-edit-row">
                      <label htmlFor="name">Nazwa:</label>
                      <Field
                        className="poke-edit-input"
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                      />
                      <ErrorMessage name="name" component="div" />
                    </div>

                    <div className="poke-edit-row">
                      <label htmlFor="height">Wysokość</label>
                      <Field
                        className="poke-edit-input"
                        type="number"
                        id="height"
                        name="height"
                        onChange={handleChange}
                      />
                      <ErrorMessage name="height" component="div" />
                    </div>

                    <div className="poke-edit-row">
                      <label htmlFor="weight">Waga</label>
                      <Field
                        className="poke-edit-input"
                        type="number"
                        id="weight"
                        name="weight"
                        onChange={handleChange}
                      />
                      <ErrorMessage name="weight" component="div" />
                    </div>

                    <div className="poke-edit-row">
                      <label htmlFor="base_experience">Doświadczenie</label>
                      <Field
                        className="poke-edit-input"
                        type="number"
                        id="base_experience"
                        name="base_experience"
                        onChange={handleChange}
                      />
                      <ErrorMessage name="base_experience" component="div" />
                    </div>
                    <div className="poke-edit-row">
                      <label htmlFor="ability">Umiejętność</label>
                      <Field
                        className="poke-edit-input"
                        type="ability"
                        id="ability"
                        name="ability"
                        onChange={handleChange}
                      />
                      <ErrorMessage name="ability" component="div" />
                    </div>

                    <button className="poke-edit-button" type="submit">
                      Edytuj
                    </button>
                    <button
                      className="poke-edit-button"
                      type="button"
                      onClick={() => handleEditPokemon(values, true)}
                    >
                      Zapisz jako nowy
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Settings;
