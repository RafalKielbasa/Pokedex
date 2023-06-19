import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import { AppContext } from "../src/AppContext";

const Pokeinfo = () => {
  const { pokesData } = useContext(AppContext);
  const { id } = useParams();
  const pokemonIndex = parseInt(id, 10);
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`
        );
        setPokemonData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonIndex]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="modalInfo">
        <h1 id="pokedex">POKEDEX</h1>
        <div id="imgDetails">
          <img
            id="imgSize"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonIndex}.svg`}
            alt=""
          />
        </div>
        <h1 className="nameDetails">
          {pokemonData.name &&
            pokemonData.name.charAt(0).toUpperCase() +
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
            {pokemonData.abilities && (
              <h5>{pokemonData.abilities[0].ability.name}</h5>
            )}
            <h3>Ability</h3>
          </div>
        </div>
        <Link to={`/pokedex/1`}>
          <button className="homePageButton">Strona główna</button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Pokeinfo;
