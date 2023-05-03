import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import pokeLogo from "../images/pokepoke.png";
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
          backgroundColor: theme ? "grey" : "white",
          borderRadius: "0px",
        }}
      >
        <img
          src={pokeLogo}
          alt="poke"
          className="custom-logo"
          style={{
            width: "150px",
            height: "100px",
            marginRight: "10px",
            backgroundColor: theme ? "grey" : "white",
          }}
        />

        <Link to="/" class="active item">
          Home
        </Link>
        <Link to="/favorites" class="item">
          Favorites
        </Link>
        <div class="right menu">
          <div class="ui dropdown item">
            Language <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item">English</a>
              <a class="item">Russian</a>
              <a class="item">Spanish</a>
            </div>
          </div>
          <div class="item">
            <div class="item">
              <ThemeToggleButton onChange={toggleTheme} checked={theme} />
            </div>
            <a
              style={{ fontWeight: "bold" }}
              href="https://github.com/mr-fox93"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="github icon" /> mr-fox93
            </a>
          </div>
          <div class="item">
            <div class="ui primary button">Sign Up</div>
          </div>
        </div>
      </div>
    </div>
  );
};
