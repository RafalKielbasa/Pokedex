import React, { useState, useEffect, useContext } from "react";
import MainLayout from "../layout/MainLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { AppContext } from "../src/AppContext";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

function Settings() {
  const { pokesData } = useContext(AppContext);
  const [pokemonData, setPokemonData] = useState([]);
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pokesData && pokesData.length > 0) {
      setPokemonData(pokesData);
      setLoading(false);
    }
  }, [pokesData]);

  const handleEditPokemon = (editedPokemon) => {
    // const fetchData = async () => {
    //   const pokemonData = await axios.get("http://localhost:4100/pokemonData");
    //   setPokeData(pokemonData.data);
    // };

    // fetchData();
    const existingPokemon = pokesData.filter(
      (pokemon) => pokemon.id == editedPokemon.id
    );
    console.log(existingPokemon, "existingPokemon");

    if (existingPokemon.length !== 0) {
      const newPokemon = {
        name: editedPokemon.name,
        height: editedPokemon.height,
        weight: editedPokemon.weight,
        base_experience: editedPokemon.base_experience,
        ability: editedPokemon.ability,
        new: true,
        wins: 0,
        loses: 0,
      };

      axios
        .post("http://localhost:4100/pokemonData", newPokemon)
        .then((response) => {
          console.log("Nowy pokemon zostały zapisany:", response.data);
          enqueueSnackbar("Dane zostały zapisane");

          setPokemonData((prevPokemonData) => [
            ...prevPokemonData,
            response.data,
          ]);
        })
        .catch((error) => {
          enqueueSnackbar("Wystąpił błąd podczas zapisywania");

          console.error(
            "Wystąpił błąd podczas zapisywania nowego pokemona:",
            error
          );
        });
    } else {
      const updatedPokemon = {
        id: editedPokemon.id,
        name: editedPokemon.name,
        height: editedPokemon.height,
        weight: editedPokemon.weight,
        base_experience: editedPokemon.base_experience,
        ability: editedPokemon.ability,
      };

      axios
        .put(
          `http://localhost:4100/pokemonData/${editedPokemon.id}`,
          updatedPokemon
        )
        .then((response) => {
          enqueueSnackbar("Dane zostały zaktualizowane");

          console.log("Dane zostały zaktualizowane:", response.data);
          const updatedData = pokemonData.map((pokemon) =>
            pokemon.id === editedPokemon.id ? updatedPokemon : pokemon
          );
          setPokemonData(updatedData);
        })
        .catch((error) => {
          enqueueSnackbar("Wystąpił błąd podczas aktualizacji danych");

          console.error("Wystąpił błąd podczas aktualizacji danych:", error);
        });
    }
  };

  return (
    <MainLayout>
      <SnackbarProvider>
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
                    ability:
                      pokemon.abilities && pokemon.abilities.length > 0
                        ? pokemon.abilities[0].ability.name
                        : pokemon.ability,
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
      </SnackbarProvider>
    </MainLayout>
  );
}

export default Settings;
