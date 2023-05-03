import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import pokeLogo from "../images/poke.png";
import { ThemeContext } from "./ThemeContext";
import { ThemeToggleButton } from "./ThemeToggleButton";

export const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <div>
      <div
        class="ui standard menu"
        style={{
          backgroundColor: theme ? "black" : "white",
          color: theme ? "white" : "black",
          borderRadius: "0px",
        }}
      >
        <img
          src={pokeLogo}
          alt="poke"
          className="custom-logo"
          style={{
            width: "100px",
            height: "100px",
            marginRight: "10px",
            backgroundColor: theme ? "black" : "white",
          }}
        />

        <Link
          style={{ color: theme ? "white" : "black" }}
          to="/"
          class="active item"
        >
          Home
        </Link>
        <Link
          style={{ color: theme ? "white" : "black" }}
          to="/favorites"
          class="item"
        >
          Favorites
        </Link>

        <div class="right menu">
          <div class="item">
            <div class="item">
              <ThemeToggleButton onChange={toggleTheme} checked={theme} />
            </div>
            <a
              style={{ fontWeight: "bold", fontSize: "20px" }}
              href="https://github.com/mr-fox93"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="github icon" /> mr-fox93
            </a>
          </div>
          <div class="item">
            <Link to="/login" class="ui primary button">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
