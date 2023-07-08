import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.post("http://localhost:4100/login", {
        username,
        password,
      });
      fetch("http://localhost:4100/users/")
        .then((res) => res.json())
        .then((resp) => {
          if (resp.length === 0) {
            alert("Please Enter valid username");
          } else {
            const user = resp.find((user) => user.username === username);
            if (user && user.password === password) {
              enqueueSnackbar("Zalogowano pomyślnie!");
              window.localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("favoritesId", JSON.stringify([]));
              localStorage.setItem("bookmarkedId", JSON.stringify([]));
              setTimeout(() => {
                navigateTo(`/edycja/`);
                window.location.reload();
              }, 750);
            } else {
              enqueueSnackbar("Błąd podczas logowania");
            }
          }
        })
        .catch((err) => {
          alert("Login Failed due to: " + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      console.log("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      console.log("Please Enter Password");
    }
    return result;
  };

  return (
    <MainLayout>
      <SnackbarProvider>
        <div className="login-row">
          <div className="loginForm">
            <form onSubmit={ProceedLogin} className="loginContainer">
              <div className="loginCard">
                <div className="login-card-header">
                  <h2>Logowanie</h2>
                </div>
                <div className="login-card-body">
                  <input
                    placeholder="Imię"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-form-control"
                  />
                  <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-form-control"
                  />
                </div>
                <div className="login-card-footer">
                  <button type="submit" className="login-btn-primary">
                    Zaloguj się
                  </button>
                  <Link to="/rejestracja">
                    <p className="dont-have-account">
                      Nie masz jeszcze konta? Zarejestruj się
                    </p>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </SnackbarProvider>
    </MainLayout>
  );
};

export default Login;
