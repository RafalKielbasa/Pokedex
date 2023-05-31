import React from "react";
import MainLayout from "../layout/MainLayout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Pokeinfo = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const { id } = useParams();
  const pokemonIndex = parseInt(id, 10);

  useEffect(() => {
    if (!pokemonData) {
      return;
    }

    axios
      .get("http://localhost:4100/pokemonData")
      .then((response) => {
        setPokemonData(response.data[id - 1]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Wystąpił błąd podczas pobierania danych:", error);
        setLoading(false);
      });
  }, [pokemonData]);
  return (
    <MainLayout>
      {pokemonData.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="modalInfo">
          <h1 id="pokedex">POKEDEX</h1>
          <div id="imgDetails">
            <img
              id="imgSize"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`}
              alt=""
            />
          </div>
          <h1 className="nameDetails">
            {pokemonData.name.charAt(0).toUpperCase() +
              pokemonData.name.slice(1)}
          </h1>

          <div className="details">
            <div className="heightAndWeight">
              <h5>{pokemonData.height}</h5>
              <h3>Height</h3>
              <h5>{pokemonData.weight}</h5>
              <h3>Weight</h3>
            </div>
            <div className="experienceAndAbility">
              <h5>{pokemonData.base_experience}</h5>
              <h3>Base experience</h3>
              <h5>{pokemonData.ability}</h5>
              <h3>Ability</h3>
            </div>
          </div>
          <Link to={`/pokedex/1`}>
            <button className="homePageButton">Strona główna</button>
          </Link>
        </div>
      )}
    </MainLayout>
  );
};
export default Pokeinfo;
