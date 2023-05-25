import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ConditionalNavbarBtn } from "src/components";
import GlobalContext from "src/context/GlobalContext";

const NavigationBar = () => {
  const { loggedIn, setLoggedIn, setUser, theme, activeBtn, ActiveBtnHandle } =
    useContext(GlobalContext);
  return (
    <>
      <Link to="/">
        <ConditionalNavbarBtn
          activeBtn={activeBtn}
          value={"Home"}
          clickHandle={(e) => ActiveBtnHandle(e.target.innerHTML)}
          theme={theme}
        />
      </Link>
      <Link to="favourites">
        <ConditionalNavbarBtn
          activeBtn={activeBtn}
          value={"Ulubione"}
          clickHandle={(e) => ActiveBtnHandle(e.target.innerHTML)}
          theme={theme}
        />
      </Link>
      <Link to="arena">
        <ConditionalNavbarBtn
          activeBtn={activeBtn}
          value={"Arena"}
          clickHandle={(e) => ActiveBtnHandle(e.target.innerHTML)}
          theme={theme}
        />
      </Link>
      {!loggedIn && (
        <Link Link to="logIn">
          <ConditionalNavbarBtn
            activeBtn={activeBtn}
            value={"Logowanie"}
            clickHandle={(e) => ActiveBtnHandle(e.target.innerHTML)}
            theme={theme}
          />
        </Link>
      )}
      {!loggedIn && (
        <Link to="register">
          <ConditionalNavbarBtn
            activeBtn={activeBtn}
            value={"Rejestracja"}
            clickHandle={(e) => ActiveBtnHandle(e.target.innerHTML)}
            theme={theme}
          />
        </Link>
      )}
      {loggedIn && (
        <Link to="edit">
          <ConditionalNavbarBtn
            activeBtn={activeBtn}
            value={"Edytowanie"}
            clickHandle={(e) => ActiveBtnHandle(e.target.innerHTML)}
            theme={theme}
          />
        </Link>
      )}
      {loggedIn && (
        <Link to="/">
          <ConditionalNavbarBtn
            activeBtn={activeBtn}
            value={"Wyloguj"}
            clickHandle={() => {
              setLoggedIn(false);
              setUser(null);
            }}
            theme={theme}
          />
        </Link>
      )}
    </>
  );
};
export default NavigationBar;
