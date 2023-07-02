import React from "react";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styled, { css } from "styled-components";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/context/AppContext";
import { useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";

const DetailsPageWrapper = styled("div")(
  ({ theme }) =>
    css`
      padding: 20px 250px 150px 250px;
      background-color: ${theme.bgColor};
    `
);

const DetailsPage = () => {
  const { theme, theme2, isDark } = useContext(AppContext);
  const location = useLocation();
  const id = location.state?.id;

  const expFullPokemonDataFormated = location.state?.expFullPokemonDataFormated;
  const pokemonDataFiltered =
    expFullPokemonDataFormated === undefined
      ? []
      : expFullPokemonDataFormated?.filter((item) => item.id === id);

  const favorites = location.state?.favorites;
  const favoritesFiltered =
    favorites === undefined ? [] : favorites?.filter((item) => item.id === id);

  const selectValue = location.state?.selectValue;

  const navigate = useNavigate();
  const handleClick = () => {
    selectValue === undefined ? navigate("/") : navigate("/ranking");
  };
  const handleClickFavorite = () => {
    navigate("/favorites");
  };

  return (
    <>
      {pokemonDataFiltered.length > 0 ? (
        <>
          <DetailsPageWrapper theme={theme}>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "20px" }}
                variant="body2"
                color="green"
              >
                Strona szczegółów pokemona
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "40px",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "25px",
                }}
                variant="body2"
                color="black"
              >
                Pokedex
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "40px",
                  display: "flex",
                  justifyContent: "center",
                  padding: "25px 0px 0px 350px",
                }}
                variant="body2"
                color="black"
              >
                {pokemonDataFiltered[0].name}
              </Typography>
            </CardContent>

            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <img
                  src={pokemonDataFiltered[0].picDet}
                  alt={"picture"}
                  key={id}
                />
              </div>

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  marginRight: "200px",
                }}
              >
                <CardContent
                  sx={{ marginRight: "300px", paddingBottom: "24px" }}
                >
                  <Typography
                    sx={{ fontSize: "20px", textAlign: "center" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {pokemonDataFiltered[0].height}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      paddingBottom: "20px",
                      textAlign: "center",
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Height
                  </Typography>
                  <Typography
                    sx={{ fontSize: "20px", textAlign: "center" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {pokemonDataFiltered[0].weight}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Weight
                  </Typography>
                </CardContent>

                <CardContent>
                  <Typography
                    sx={{ fontSize: "20px", textAlign: "center" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {pokemonDataFiltered[0].baseexp}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      paddingBottom: "20px",
                      textAlign: "center",
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Base Experience
                  </Typography>
                  <Typography
                    sx={{ fontSize: "20px", textAlign: "center" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {pokemonDataFiltered[0].abilitie}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Ability
                  </Typography>
                </CardContent>
              </CardContent>
            </CardContent>
          </DetailsPageWrapper>
          <ThemeProvider theme={theme2}>
            <Stack
              direction="row"
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: isDark ? "#616161" : "white",
              }}
            >
              <Button
                style={{
                  width: "80%",
                  textTransform: "capitalize",
                  marginBottom: "350px",
                }}
                variant="outlined"
                color={isDark ? "secondary" : "primary"}
                onClick={handleClick}
              >
                Strona główna
              </Button>
            </Stack>
          </ThemeProvider>
        </>
      ) : (
        <>
          <DetailsPageWrapper theme={theme}>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "20px" }}
                variant="body2"
                color="green"
              >
                Strona szczegółów pokemona
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "40px",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "25px",
                }}
                variant="body2"
                color="black"
              >
                Pokedex
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "40px",
                  display: "flex",
                  justifyContent: "center",
                  padding: "25px 0px 0px 350px",
                }}
                variant="body2"
                color="black"
              >
                {favoritesFiltered[0].name}
              </Typography>
            </CardContent>

            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <img
                  src={favoritesFiltered[0].picDet}
                  alt={"picture"}
                  key={id}
                />
              </div>

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  marginRight: "200px",
                }}
              >
                <CardContent
                  sx={{ marginRight: "300px", paddingBottom: "24px" }}
                >
                  <Typography
                    sx={{ fontSize: "20px", textAlign: "center" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {favoritesFiltered[0].height}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      paddingBottom: "20px",
                      textAlign: "center",
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Height
                  </Typography>
                  <Typography
                    sx={{ fontSize: "20px", textAlign: "center" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {favoritesFiltered[0].weight}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Weight
                  </Typography>
                </CardContent>

                <CardContent>
                  <Typography
                    sx={{ fontSize: "20px", textAlign: "center" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {favoritesFiltered[0].baseexp}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      paddingBottom: "20px",
                      textAlign: "center",
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Base Experience
                  </Typography>
                  <Typography
                    sx={{ fontSize: "20px", textAlign: "center" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {favoritesFiltered[0].abilitie}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Ability
                  </Typography>
                </CardContent>
              </CardContent>
            </CardContent>
          </DetailsPageWrapper>
          <ThemeProvider theme={theme2}>
            <Stack
              direction="row"
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: isDark ? "#616161" : "white",
              }}
            >
              <Button
                style={{
                  width: "80%",
                  textTransform: "capitalize",
                  marginBottom: "350px",
                }}
                variant="outlined"
                color={isDark ? "secondary" : "primary"}
                onClick={handleClickFavorite}
              >
                Strona główna
              </Button>
            </Stack>
          </ThemeProvider>
        </>
      )}
    </>
  );
};
export default DetailsPage;
