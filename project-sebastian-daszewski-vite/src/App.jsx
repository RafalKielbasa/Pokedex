import "./App.css";
import MainLayout from "../layout/MainLayout";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#242424" : "#EEE"};
    color: ${(props) => (props.theme.mode === "dark" ? "#EEE" : "#111")};
  }
`;

function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  function getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme ? JSON.parse(savedTheme) : { mode: "light" };
  }

  return (
    <MainLayout>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
      </ThemeProvider>
    </MainLayout>
  );
}

export default App;
