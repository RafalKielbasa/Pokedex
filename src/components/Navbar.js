import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export const Navbar = () => {
  return (
    <div>
      <div
        class="ui huge menu"
        style={{
          backgroundColor: "papayawhip",
        }}
      >
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
            <div class="ui primary button">Sign Up</div>
          </div>
        </div>
      </div>
    </div>
  );
};

//<Link to="/favorites">Go to favorites</Link>;
