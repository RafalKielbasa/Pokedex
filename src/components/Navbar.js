import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import pokeLogo from "../images/poke.png";
import { ThemeContext } from "./ThemeContext";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { SearchContext } from "./SearchContext";
import { Button, Input } from "semantic-ui-react";
import { LoginContext } from "./LoginContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "./FavoritesContext";

const StyledNavLink = styled(NavLink)`
  font-weight: bold !important;

  &.active {
    color: palevioletred !important;
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125) !important;
    transform: translateY(2px);
  }
`;

const StyledInput = styled(Input)`
  &.ui.input > input {
    background-color: palevioletred !important;
    color: white !important;
  }
`;
export const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { search, setSearch } = useContext(SearchContext);
  const { userData, setUserData } = useContext(LoginContext);
  const navigate = useNavigate();
  //
  const { favorites, count } = useFavorite();
  //

  const toggleTheme = () => {
    setTheme(!theme);
  };

  const navToUser = () => {
    if (userData) {
      navigate("/user");
    }
  };
  return (
    <div>
      <div
        className="ui tiny menu"
        style={{
          backgroundColor: theme ? "#720e9e	" : "papayawhip",
          color: theme ? "white" : "black",
          borderRadius: "0px",
        }}
      >
        <img
          src={pokeLogo}
          alt="poke"
          className="custom-logo"
          style={{
            width: "70px",
            height: "70px",
            marginRight: "10px",
            backgroundColor: theme ? "#720e9e" : "papayawhip",
          }}
        />

        <StyledNavLink
          style={{ color: theme ? "white" : "black" }}
          to="/"
          className="item"
        >
          Home
        </StyledNavLink>
        <StyledNavLink
          style={{ color: theme ? "white" : "black" }}
          to="/favorites"
          className="item"
        >
          Favorites {favorites.length > 0 ? ` ❤️ ${count}` : null}
        </StyledNavLink>
        <StyledNavLink
          style={{ color: theme ? "white" : "black" }}
          to="/arena"
          className="item"
        >
          Fight Arena
        </StyledNavLink>
        {userData ? (
          <StyledNavLink
            style={{ color: theme ? "white" : "black" }}
            to="/edit"
            className="item"
          >
            Edit Pokemon's{" "}
          </StyledNavLink>
        ) : null}

        <div
          class="right menu"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div onClick={navToUser} class="item">
            {userData ? (
              <>
                <i class="user icon"></i> {userData.name}
              </>
            ) : null}
          </div>
          <StyledInput
            icon="search icon"
            class="ui icon input"
            style={{
              height: "40px",
              marginRight: "15px",
            }}
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div class="item">
            <div class="item">
              <ThemeToggleButton onChange={toggleTheme} checked={theme} />
            </div>
            <a
              style={{ fontWeight: "bold", fontSize: "15px" }}
              href="https://github.com/mr-fox93"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="github icon" /> mr-fox93
            </a>
          </div>
          <div class="item">
            {userData ? (
              <Button
                className="ui negative basic button"
                onClick={() => setUserData(null)}
              >
                Log Out
              </Button>
            ) : (
              <Link to="/register" class="ui primary button">
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /*"#8A2BE2	"*/
}
