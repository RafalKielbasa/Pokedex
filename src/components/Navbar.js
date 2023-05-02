import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import pokeLogo from "../images/poke.png";

export const Navbar = () => {
  return (
    <div>
      <div class="ui huge menu">
        <img
          src={pokeLogo}
          alt="poke"
          style={{ width: "50px", height: "50px" }}
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
            <a
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

//<Link to="/favorites">Go to favorites</Link>;
//<i class="github icon">mr-fox93</i>
