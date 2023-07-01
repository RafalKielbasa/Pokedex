import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../src/AppContext";
import MainLayout from "../layout/MainLayout";

const Ranking = ({ query, nextUrl, prevUrl, pokeData }) => {
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [bookmarkedPokemons, setBookmarkedPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("height");
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  const { number } = useParams();
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();
  const { pokesData } = useContext(AppContext);

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

  const toggleFavoritePokemon = (id) => {
    setFavoritePokemons((prevFavoritePokemons) => {
      const updatedFavorites = prevFavoritePokemons.includes(id)
        ? prevFavoritePokemons.filter((prevId) => prevId !== id)
        : [...prevFavoritePokemons, id];

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
        navigateTo(`/pokemon/${id}`);
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    navigateTo(`/ranking/${currentPage}`);
  }, [query]);

  const sortedPokeData = pokesData.sort(function (a, b) {
    if (sortBy === "height-max") {
      if (a.height > b.height) return 1;
      if (a.height < b.height) return -1;
    } else if (sortBy === "height-min") {
      if (a.height < b.height) return 1;
      if (a.height > b.height) return -1;
    } else if (sortBy === "weight-max") {
      if (a.weight > b.weight) return 1;
      if (a.weight < b.weight) return -1;
    } else if (sortBy === "weight-min") {
      if (a.weight < b.weight) return 1;
      if (a.weight > b.weight) return -1;
    } else if (sortBy === "experience-max") {
      if (a.base_experience > b.base_experience) return 1;
      if (a.base_experience < b.base_experience) return -1;
    } else if (sortBy === "experience-min") {
      if (a.base_experience < b.base_experience) return 1;
      if (a.base_experience > b.base_experience) return -1;
    }
    return 0;
  });

  return (
    <>
      <MainLayout>
        <h1 className="pokeEditingH1">Ranking</h1>
        <label for="sort">Sortuj według:</label>
        <select
          name="sort"
          id="sort"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="height-max">Wzrost rosnąco</option>
          <option value="height-min">Wzrost malejąco</option>
          <option value="weight-max">Waga rosnąco</option>
          <option value="weight-min">Waga malejąco</option>
          <option value="experience-max">Doświadczenie rosnąco</option>
          <option value="experience-min">Doświadczenie malejąco</option>
        </select>
        <div className="container-ranking">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              {sortedPokeData.map((item, index) => {
                const isFavorite = favoritePokemons.includes(item.id);
                const isBookmarked = bookmarkedPokemons.includes(item.id);
                return (
                  <div
                    className="card-ranking"
                    key={item.id}
                    onClick={(event) => handleCardClick(event, item.id)}
                  >
                    <div className="ranking-number">{index + 1}</div>
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
                        disabled={
                          !isBookmarked && bookmarkedPokemons.length >= 2
                        }
                      />
                    </div>
                    <Link to={`/pokemon/${item.id}`}>
                      <img
                        id="cardImg"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`}
                        alt=""
                      />
                    </Link>
                    <h1 className="cardName">
                      {item.name &&
                        item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </h1>
                    <div className="detailsFirstLine">
                      <div className="height">
                        <h4 className="heightValue">{item.height}</h4>
                        <h3>Height</h3>
                      </div>
                      <div className="experience">
                        <h4 className="experienceValue">
                          {item.base_experience}
                        </h4>
                        <h3>Base experience</h3>
                      </div>
                    </div>
                    <div className="detailsSecondLine">
                      <div className="weight">
                        <h4 className="weightValue">{item.weight}</h4>
                        <h3>Weight</h3>
                      </div>
                      <div className="ability">
                        <h4 className="abilityValue">
                          {item.abilities && item.abilities.length > 0
                            ? item.abilities[0].ability.name
                            : item.ability}
                        </h4>
                        <h3 className="ability">Ability</h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Ranking;
