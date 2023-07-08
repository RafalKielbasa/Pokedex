import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Card = ({ query, nextUrl, prevUrl, pokeData }) => {
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [bookmarkedPokemons, setBookmarkedPokemons] = useState([]);
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { number } = useParams();
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (number) {
      setCurrentPage(parseInt(number));
    }
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

  const search = (data) => {
    return data.filter((item) => item.name.toLowerCase().includes(query));
  };

  useEffect(() => {
    setCurrentPage(1);
    navigateTo(`/pokedex/${currentPage}`);
  }, [query]);

  const visiblePokeData = query !== "" ? search(pokeData) : pokeData;
  const slicedPokeData = visiblePokeData.slice(
    (currentPage - 1) * 15,
    currentPage * 15
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      navigateTo(`/pokedex/${currentPage - 1}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < 11) {
      setCurrentPage(currentPage + 1);
      navigateTo(`/pokedex/${currentPage + 1}`);
    }
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {slicedPokeData.map((item) => {
            const isFavorite = favoritePokemons.includes(item.id);
            const isBookmarked = bookmarkedPokemons.includes(item.id);
            return (
              <div
                className="card"
                key={item.id}
                onClick={(event) => handleCardClick(event, item.id)}
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
                    <h4 className="experienceValue">{item.base_experience}</h4>
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

          <div className="btn-group">
            <button
              className="btn-prev-page"
              style={{
                display:
                  query !== "" || currentPage === 1 ? "none" : "inline-block",
              }}
              onClick={handlePrevPage}
            >
              Poprzednia
            </button>

            <button
              className="btn-next-page"
              style={{
                display:
                  query !== "" || currentPage === 11 ? "none" : "inline-block",
              }}
              onClick={handleNextPage}
            >
              Następna
            </button>
          </div>
          <div className="current">Strona nr. {currentPage}</div>
        </>
      )}
    </>
  );
};

export default Card;
