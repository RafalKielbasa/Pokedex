import MainLayout from "../layout/MainLayout";
import { useState, useEffect, useContext } from "react";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../src/AppContext";

function Favourites() {
  const { pokesData } = useContext(AppContext);

  const [pokeData, setPokeData] = useState([]);
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [bookmarkedPokemons, setBookmarkedPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [favoritesId, setFavoritesId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFavoritesId =
      JSON.parse(localStorage.getItem("favoritesId")) || [];

    setFavoritesId(storedFavoritesId);
  }, []);

  useEffect(() => {
    const favoritesId = JSON.parse(localStorage.getItem("favoritesId"));
    if (favoritesId) {
      setFavoritePokemons(favoritesId);
    }
  }, []);

  useEffect(() => {
    const bookmarkedId = JSON.parse(localStorage.getItem("bookmarkedId"));
    if (bookmarkedId) {
      setBookmarkedPokemons(bookmarkedId);
    }
  }, []);

  useEffect(() => {
    if (pokesData && pokesData.length > 0) {
      const filteredData = pokesData.filter((item) =>
        favoritesId.includes(item.id)
      );
      setPokeData(filteredData);
      setFavoritePokemons(favoritesId);
      setLoading(false);
    }
  }, [pokesData, favoritesId]);

  const toggleFavoritePokemon = (id) => {
    setFavoritePokemons((prevFavoritePokemons) => {
      const updatedFavorites = prevFavoritePokemons.includes(id)
        ? prevFavoritePokemons.filter((prevId) => prevId !== id)
        : [...prevFavoritePokemons, id];

      setPokeData((prevPokeData) =>
        prevPokeData.filter((pokemon) => pokemon.id !== id)
      );

      setFavoritesId((prevFavoritesId) =>
        prevFavoritesId.filter((prevId) => prevId !== id)
      );

      localStorage.setItem("favoritesId", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const toggleBookmarkedPokemon = (id) => {
    setBookmarkedPokemons((prevBookmarkedPokemons) => {
      const updatedBookmarked = prevBookmarkedPokemons.includes(id)
        ? prevBookmarkedPokemons.filter((prevId) => prevId !== id)
        : [...prevBookmarkedPokemons, id];

      const existingPokemon = pokeData.find((pokemon) => pokemon.id === id);
      if (existingPokemon) {
        const newPokemon = {
          id: existingPokemon.id,
          name: existingPokemon.name,
          height: existingPokemon.height,
          weight: existingPokemon.weight,
          base_experience: existingPokemon.base_experience,
          ability: existingPokemon.ability,
          wins: existingPokemon.wins || 0,
          loses: existingPokemon.loses || 0,
        };

        if (!updatedBookmarked.includes(id)) {
          axios
            .delete(`http://localhost:4100/pokemonDataToFight/${id}`)
            .then((response) => {
              console.log(
                "Pokemon został usunięty z pokemonDataToFight:",
                response.data
              );
              setPokemonData((prevPokemonData) =>
                prevPokemonData.filter((pokemon) => pokemon.id !== id)
              );
            })
            .catch((error) => {
              console.error(
                "Wystąpił błąd podczas usuwania pokemona z pokemonDataToFight:",
                error
              );
            });
        } else {
          axios
            .post("http://localhost:4100/pokemonDataToFight", newPokemon)
            .then((response) => {
              axios.post("http://localhost:4100/pokemonData", newPokemon);
              console.log("Nowy pokemon został zapisany:", response.data);
              setPokemonData((prevPokemonData) => [
                ...prevPokemonData,
                response.data,
              ]);
            })
            .catch((error) => {
              console.error(
                "Wystąpił błąd podczas zapisywania nowego pokemona:",
                error
              );
            });
        }
      }

      localStorage.setItem("bookmarkedId", JSON.stringify(updatedBookmarked));
      return updatedBookmarked;
    });
  };

  const handleCardClick = (event, id) => {
    if (event.target.tagName !== "INPUT") {
      if (!favoritePokemons.includes(id)) {
        window.location.href = `/pokemon/${id}`;
      }
    }
  };

  return (
    <div className="allCardsFavorites">
      {loading ? (
        <div>Loading...</div>
      ) : favoritesId && favoritesId.length > 0 ? (
        <MainLayout>
          {pokeData.map((item) => {
            const isFavorite = favoritePokemons.includes(item.id);
            const isBookmarked = bookmarkedPokemons.includes(item.id);
            const shouldDisplay = isBookmarked || isFavorite;

            return (
              <div
                className="cardFavorites"
                key={item.id}
                onClick={(event) => handleCardClick(event, item.id)}
                style={{ display: shouldDisplay ? "inline-block" : "none" }}
              >
                <div className="checkbox">
                  <Checkbox
                    checked={isFavorite}
                    onChange={() => toggleFavoritePokemon(item.id)}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                  <Checkbox
                    checked={isBookmarked}
                    onChange={() => toggleBookmarkedPokemon(item.id)}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                    disabled={!isBookmarked && bookmarkedPokemons.length >= 2}
                  />
                </div>

                <img
                  id="cardImg"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`}
                  alt=""
                />
                <h1 className="cardName">
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </h1>
                <div className="detailsFirstLine">
                  <div className="height">
                    <h4 className="heightValue">{item.height}</h4>
                    <h3>Height</h3>
                  </div>
                  <div className="experience">
                    <h4 className="experienceValue">{item.base_experience}</h4>
                    <h3>Base experience</h3>
                  </div>
                </div>
                <div className="detailsSecondLine">
                  <div className="weight">
                    <h4 className="weightValue">{item.weight}</h4>
                    <h3>Weight</h3>
                  </div>
                  <div className="abilityFavorites">
                    <h4 className="abilityValueFavorites">
                      {item.abilities && item.abilities.length > 0
                        ? item.abilities[0].ability.name
                        : item.ability}
                    </h4>
                    <h3>Ability</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </MainLayout>
      ) : (
        <MainLayout>
          <div className="noFavoritesModal">
            <h2 className="noFavorites">
              Nie masz jeszcze ulubionych pokemonów
            </h2>
            <Link to="/pokedex/1">
              <h3 className="noFavoritesLink">dodaj ulubione pokemony tutaj</h3>
            </Link>
          </div>
        </MainLayout>
      )}
    </div>
  );
}

export default Favourites;
