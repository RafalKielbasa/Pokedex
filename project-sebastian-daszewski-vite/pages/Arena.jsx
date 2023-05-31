import React from "react";
import MainLayout from "../layout/MainLayout";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Modal from "../Components/Modal";
import axios from "axios";

function Arena() {
  const [pokeData, setPokeData] = useState([]);
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [bookmarkedPokemons, setBookmarkedPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [bookmarkedId, setBookmarkedId] = useState([]);
  const [favoritesId, setFavoritesId] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [winnerName, setWinnerName] = useState("");
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

  useEffect(() => {
    const favoritesId = JSON.parse(localStorage.getItem("favoritesId"));
    if (favoritesId) {
      setFavoritePokemons(favoritesId);
    }
  }, []);

  useEffect(() => {
    const bookmarkedId = JSON.parse(localStorage.getItem("bookmarkedId"));
    if (bookmarkedId) {
      setBookmarkedId(bookmarkedId);
    }
  }, []);

  useEffect(() => {
    const filteredData = pokemonData.filter((item) =>
      bookmarkedId.includes(item.id)
    );
    setPokeData(filteredData);
    setBookmarkedPokemons(bookmarkedId);
  }, [pokemonData, bookmarkedId]);

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

    if (bookmarkedPokemons.includes(id)) {
      setPokeData((prevPokeData) => {
        const updatedData = prevPokeData.filter((pokemon) => pokemon.id !== id);
        return updatedData;
      });
    }

    setBookmarkedId((prevBookmarkedId) => {
      const updatedBookmarkedId = prevBookmarkedId.includes(id)
        ? prevBookmarkedId.filter((prevId) => prevId !== id)
        : [...prevBookmarkedId, id];

      localStorage.setItem("bookmarkedId", JSON.stringify(updatedBookmarkedId));
      return updatedBookmarkedId;
    });
  };

  const handleCardClick = (event, id) => {
    if (event.target.tagName !== "INPUT") {
      if (!favoritePokemons.includes(id)) {
        window.location.href = `/pokemon/${id}`;
      }
    }
  };

  const handleFight = () => {
    setIsOpen(true);
    const firstPlayer = pokeData[0].base_experience * pokeData[0].weight;
    const secondPlayer = pokeData[1].base_experience * pokeData[1].weight;

    if (firstPlayer > secondPlayer) {
      document
        .querySelector(".cardBookmarked2")
        .classList.add("cardBookmarked2-opacity");

      setWinnerName(
        "Wygrywa" +
          " " +
          pokeData[0].name.charAt(0).toUpperCase() +
          pokeData[0].name.slice(1)
      );

      const updatedFirstPlayer = {
        ...pokeData[0],
        base_experience: pokeData[0].base_experience + 10,
        wins: pokeData[0].wins + 1,
      };

      const updatedSecondPlayer = {
        ...pokeData[1],
        losses: pokeData[1].losses + 1,
      };

      axios
        .put(
          `http://localhost:4100/pokemonData/${updatedFirstPlayer.id}`,
          updatedFirstPlayer
        )
        .then((response) => {
          console.log(
            "Dane zostały zaktualizowane na serwerze:",
            response.data
          );
        })
        .catch((error) => {
          console.error(
            "Wystąpił błąd podczas aktualizacji danych na serwerze:",
            error
          );
        });

      axios
        .put(
          `http://localhost:4100/pokemonData/${updatedSecondPlayer.id}`,
          updatedSecondPlayer
        )
        .then((response) => {
          console.log(
            "Dane zostały zaktualizowane na serwerze:",
            response.data
          );
        })
        .catch((error) => {
          console.error(
            "Wystąpił błąd podczas aktualizacji danych na serwerze:",
            error
          );
        });

      setPokeData([updatedFirstPlayer, updatedSecondPlayer]);
    } else if (firstPlayer < secondPlayer) {
      document
        .querySelector(".cardBookmarked1")
        .classList.add("cardBookmarked1-opacity");

      setWinnerName(
        "Wygrywa" +
          " " +
          pokeData[1].name.charAt(0).toUpperCase() +
          pokeData[1].name.slice(1)
      );

      const updatedFirstPlayer = {
        ...pokeData[0],
        losses: pokeData[0].losses + 1,
      };

      const updatedSecondPlayer = {
        ...pokeData[1],
        base_experience: pokeData[1].base_experience + 10,
        wins: pokeData[1].wins + 1,
      };

      axios
        .put(
          `http://localhost:4100/pokemonData/${updatedFirstPlayer.id}`,
          updatedFirstPlayer
        )
        .then((response) => {
          console.log(
            "Dane zostały zaktualizowane na serwerze:",
            response.data
          );
        })
        .catch((error) => {
          console.error(
            "Wystąpił błąd podczas aktualizacji danych na serwerze:",
            error
          );
        });

      axios
        .put(
          `http://localhost:4100/pokemonData/${updatedSecondPlayer.id}`,
          updatedSecondPlayer
        )
        .then((response) => {
          console.log(
            "Dane zostały zaktualizowane na serwerze:",
            response.data
          );
        })
        .catch((error) => {
          console.error(
            "Wystąpił błąd podczas aktualizacji danych na serwerze:",
            error
          );
        });

      setPokeData([updatedFirstPlayer, updatedSecondPlayer]);
    } else {
      document
        .querySelector(".cardBookmarked1")
        .classList.add("cardBookmarked1-opacity");
      document
        .querySelector(".cardBookmarked2")
        .classList.add("cardBookmarked2-opacity");
      setWinnerName("Remis");
    }
  };

  const handleRemoveBookmarkedPokemon = () => {
    const updatedPokemons = "";

    setBookmarkedPokemons(updatedPokemons);
    localStorage.setItem("bookmarkedId", JSON.stringify(updatedPokemons));
  };

  return (
    <MainLayout>
      <div className="arenaSpots">
        <div
          style={{
            display: bookmarkedPokemons.length >= 1 ? "none" : "inline-block",
          }}
          className="arenaFirstSpot"
        ></div>
        <button
          disabled={bookmarkedPokemons.length < 2}
          onClick={handleFight}
          className="fight"
        >
          WALCZ!
        </button>
        {isOpen && (
          <Modal
            setIsOpen={setIsOpen}
            winnerName={winnerName}
            handleRemoveBookmarkedPokemon={handleRemoveBookmarkedPokemon}
          />
        )}
        <div
          style={{
            display: bookmarkedPokemons.length >= 2 ? "none" : "inline-block",
          }}
          className="arenaSecondSpot"
        ></div>
      </div>
      {pokeData.map((item, index) => {
        const isFavorite = favoritePokemons.includes(item.id);
        const isBookmarked = bookmarkedPokemons.includes(item.id);
        const shouldDisplay = isBookmarked;

        return (
          <div
            className={`cardBookmarked${index + 1}`}
            key={item.id}
            onClick={(event) => handleCardClick(event, item.id)}
            style={{ display: shouldDisplay ? "block" : "none" }}
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
              <div className="ability">
                <h4 className="abilityValue">{item.ability}</h4>
                <h3 className="ability">Ability</h3>
              </div>
            </div>
            <h3>
              Wygrane:{item.wins} Przegrane: {item.loses}
            </h3>
          </div>
        );
      })}
    </MainLayout>
  );
}

export default Arena;
