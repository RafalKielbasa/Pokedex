import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const DetailsPageWrapper = styled.div`
  margin-bottom: 20px;
  padding: 20px 250px 20px 250px;
  // display: flex;
  // justify-content: space-between;
  // flex-wrap: wrap;
`;

const DetailsPage = () => {
  const location = useLocation();
  const id = location.state?.id;
  const pokemonData = location.state?.pokemonData;
  const pokemonDataFiltered = pokemonData.filter((item) => item.id === id);

  console.log(`id`, id);
  console.log(`pokemonDataFiltered `, pokemonDataFiltered);

  return (
    <>
      <DetailsPageWrapper>
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
              src={
                pokemonDataFiltered[0].sprites.other.dream_world.front_default
              }
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
            <CardContent sx={{ marginRight: "300px", paddingBottom: "24px" }}>
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
                {pokemonDataFiltered[0].base_experience}
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
                {pokemonDataFiltered[0].abilities[0].ability.name}
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

      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{ borderColor: "red", color: "red", textTransform: "capitalize" }}
          variant="outlined"
        >
          Strona główna
        </Button>
      </Stack>
    </>
  );
};
export default DetailsPage;
