import MainLayout from "../layout/MainLayout";
import { useState, useEffect } from "react";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import { Link } from "react-router-dom";

function Favourites() {
  const [pokeData, setPokeData] = useState([]);
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [bookmarkedPokemons, setBookmarkedPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [favoritesId, setFavoritesId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

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

  useEffect(() => {
    const filteredData = pokemonData.filter((item) =>
      favoritesId.includes(item.id)
    );
    setPokeData(filteredData);
    setFavoritePokemons(favoritesId);
  }, [pokemonData, favoritesId]);

  return (
    <div className="allCardsFavorites">
      {favoritesId && favoritesId.length > 0 ? (
        <MainLayout>
          {pokeData.map((item) => {
            console.log(item, "item");
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
                    <h4 className="abilityValueFavorites">{item.ability}</h4>
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
