import React from "react";
import MainLayout from "../layout/MainLayout";
import { useState, useEffect, useContext } from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Modal from "../Components/Modal";
import axios from "axios";
import { AppContext } from "../src/AppContext";

function Arena() {
  const { pokesData } = useContext(AppContext);
  const [pokeData, setPokeData] = useState([]);
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [bookmarkedPokemons, setBookmarkedPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [bookmarkedId, setBookmarkedId] = useState([]);
  const [favoritesId, setFavoritesId] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokemonLocalData, setPokemonLocalData] = useState([]);

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
    if (pokesData && pokesData.length > 0) {
      const filteredData = pokesData.filter((item) =>
        bookmarkedId.includes(item.id)
      );
      setPokeData(filteredData);
      setBookmarkedPokemons(bookmarkedId);
      setLoading(false);
    }
  }, [bookmarkedId]);

  useEffect(() => {
    const fetchData = async () => {
      const pokemonData = await axios.get(
        "http://localhost:4100/pokemonDataToFight"
      );
      setPokeData(pokemonData.data);
    };

    fetchData();
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
        loses: pokeData[1].loses + 1,
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
        loses: pokeData[0].loses + 1,
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
    const updatedPokemons = [];
    const first = pokeData[0].id;
    const second = pokeData[1].id;
    setBookmarkedPokemons(updatedPokemons);

    axios
      .delete(`http://localhost:4100/pokemonDataToFight/${first}`)
      .then(() => {
        axios
          .delete(`http://localhost:4100/pokemonDataToFight/${second}`)
          .then((response) => {
            console.log(
              "Wszystkie pokemony zostały usunięte z pokemonDataToFight:",
              response.data
            );
            setPokemonData([]);
          })
          .catch((error) => {
            console.error(
              "Wystąpił błąd podczas usuwania drugiego pokemona z pokemonDataToFight:",
              error
            );
          });
      })
      .catch((error) => {
        console.error(
          "Wystąpił błąd podczas usuwania pierwszego pokemona z pokemonDataToFight:",
          error
        );
      });

    localStorage.setItem("bookmarkedId", JSON.stringify(updatedPokemons));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pokesData && pokesData.length > 0) {
          const filteredData = pokesData.filter((item) =>
            bookmarkedId.includes(item.id)
          );
          setPokeData(filteredData);
          setBookmarkedPokemons(bookmarkedId);
          setLoading(false);
        }
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych:", error);
      }
    };

    fetchData();
  }, [pokesData, bookmarkedId]);

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
