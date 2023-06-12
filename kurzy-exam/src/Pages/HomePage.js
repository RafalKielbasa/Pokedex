import React from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PokemonCard from "../Components/PokemonCards";
import styled, { css } from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useQuery } from "react-query";
import { getFullResults } from "src/api/source";
import { useSnackbar } from "notistack";
import { ThemeContext } from "src/context/ThemeContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const HomePageWrapper = styled("div")(
  ({ theme }) =>
    css`
      margin-bottom: 20px;
      padding: 0px 40px 0px 40px;
      background-color: ${theme.bgColor};
    `
);

const PaginationWrapper = styled.div`
  display: flex;
  align-items: top;
  justify-content: flex-end;
  padding-right: 38px;y
`;
const PokemonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const InfoWrapper = styled.h1`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const theme2 = createTheme({
  palette: {
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const HomePage = () => {
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [inputText, setInputText] = useState();
  const [afterBattle, setAfterBattle] = useState([]);
  const [afterBattleIds, setAfterBattleIds] = useState([]);
  const [fullPokemonData, setFullPokemonData] = useState([]);
  const [fullPokemonDataFormated, setFullPokemonDataFormated] = useState([]);
  const [expFullPokemonDataFormated, setExpFullPokemonDataFormated] = useState(
    []
  );
  const [expFullPokemonDataFiltered, setExpFullPokemonDataFiltered] = useState(
    []
  );

  const { theme } = useContext(ThemeContext);
  const { toggleTheme, isDark } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();

  const queryFullData = useQuery({
    queryKey: ["urls"],
    queryFn: () => getFullResults(),
    // staleTime: 1000000,
  });

  // const queryUrlsData = useQuery({
  //   queryKey: ["fullPokemonData"],
  //   queryFn: () => getUrlsData(queryFullData.data),
  //   staleTime: 1000000,
  //   enabled: queryFullData ? true : false,
  // });

  console.log(`queryFullData`, queryFullData.data);
  // console.log(`queryUrlsData`, queryUrlsData);

  useEffect(() => {
    enqueueSnackbar(`Załadowano bazę danych Pokemonów`, {
      preventDuplicate: true,
      autoHideDuration: 3500,
    });
  }, [queryFullData.status === "success"]);

  useEffect(() => {
    const getAfterTheBattle = async () => {
      const response = await axios.get(`http://localhost:3001/afterTheBattle/`);
      setAfterBattle(response.data);
      const getBattleIds = response?.data?.map((item) => item.id);
      setAfterBattleIds(getBattleIds);
    };
    getAfterTheBattle();
  }, []);

  useEffect(() => {
    async function getPokemonData() {
      queryFullData?.data?.map(async (item) => {
        const result = await axios.get(item?.url);
        setFullPokemonData((resultUrl) => {
          resultUrl = [...resultUrl, result?.data].sort((a, b) =>
            a.id > b.id ? 1 : -1
          );
          return resultUrl;
        });
      });
    }
    setFullPokemonData([]);
    getPokemonData();
  }, [queryFullData.status === "success", page]);

  // console.log(`FullPokemonData`, fullPokemonData);

  useEffect(() => {
    if (fullPokemonData.length === 150) {
      const getfullPokemonDataFormated = fullPokemonData?.map((item) => ({
        id: item.id,
        pic: item.sprites.front_default,
        picDet: item.sprites.other.dream_world.front_default,
        name: item.name,
        height: item.height,
        baseexp: item.base_experience,
        weight: item.weight,
        abilitie: item.abilities[0].ability.name,
      }));
      setFullPokemonDataFormated(getfullPokemonDataFormated);
    }
  }, [fullPokemonData, page]);

  useEffect(() => {
    if (fullPokemonDataFormated.length === 150) {
      const array = fullPokemonDataFormated?.filter((fPDelem) => {
        return afterBattleIds?.some((fIele) => {
          return fPDelem.id === fIele;
        });
      });
      const filterFPD = fullPokemonDataFormated?.filter(
        (n) => !array.includes(n)
      );
      const getExpFPD = afterBattle
        .concat(filterFPD)
        .sort((a, b) => (a.id > b.id ? 1 : -1));
      setExpFullPokemonDataFormated(getExpFPD);
    }
  }, [fullPokemonDataFormated, afterBattle, page]);

  fullPokemonData.length > 150 ? window.location.reload() : null;

  // const pageCount = fullPokemonData?.length / 15;
  const partialPokemonData = expFullPokemonDataFormated
    .slice(offset, offset + 15)
    .sort((a, b) => (a.id > b.id ? 1 : -1));

  const inputHandler = (event) => {
    const textFieldText = event.target.value.toLowerCase();
    setInputText(textFieldText);
  };

  useEffect(
    () =>
      expFullPokemonDataFormated &&
      setExpFullPokemonDataFiltered(
        expFullPokemonDataFormated.filter(
          ({ name, height, base_experience, weight }) =>
            name?.toLowerCase().includes(inputText) ||
            height?.toString().toLowerCase().includes(inputText) ||
            base_experience?.toString().toLowerCase().includes(inputText) ||
            weight?.toString().toLowerCase().includes(inputText)
        )
      ),
    [inputText]
  );

  const handleChange = (event, value) => {
    setPage(value);
    setOffset((value - 1) * 15);
  };

  return (
    <>
      {inputText ? (
        <HomePageWrapper theme={theme}>
          <PaginationWrapper>
            <ThemeProvider theme={theme2}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  multiline={true}
                  size="small"
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  onChange={inputHandler}
                  sx={{ marginRight: "400px" }}
                  color={isDark ? "secondary" : "primary"}
                />
              </Box>

              <Stack spacing={2}>
                <Pagination
                  page={page}
                  count={1}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChange}
                  sx={{ marginBottom: 2 }}
                  color={isDark ? "secondary" : "primary"}
                />
              </Stack>
            </ThemeProvider>
          </PaginationWrapper>

          {expFullPokemonDataFiltered.length > 0 ? (
            <PokemonWrapper>
              {expFullPokemonDataFiltered.map((item, index) => (
                <PokemonCard
                  key={index}
                  id={item.id}
                  pic={item.pic}
                  picDet={item.picDet}
                  name={item.name}
                  height={item.height}
                  baseexp={item.baseexp}
                  weight={item.weight}
                  abilitie={item.abilitie}
                  partialPokemonData={partialPokemonData}
                  fullPokemonDataFiltered={expFullPokemonDataFiltered}
                  expFullPokemonDataFormated={expFullPokemonDataFormated}
                />
              ))}
            </PokemonWrapper>
          ) : (
            <InfoWrapper>
              <h3>Brak wyników wyszukiwania</h3>
            </InfoWrapper>
          )}

          <PaginationWrapper>
            <ThemeProvider theme={theme2}>
              <Stack spacing={2}>
                <Pagination
                  page={page}
                  count={1}
                  variant="outlined"
                  shape="rounded"
                  sx={{ marginTop: 2, paddingBottom: 40 }}
                  onChange={handleChange}
                  color={isDark ? "secondary" : "primary"}
                />
              </Stack>
            </ThemeProvider>
          </PaginationWrapper>
        </HomePageWrapper>
      ) : (
        <HomePageWrapper theme={theme}>
          <PaginationWrapper>
            <ThemeProvider theme={theme2}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  multiline={true}
                  size="small"
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  onChange={inputHandler}
                  sx={{ marginRight: "400px" }}
                  color={isDark ? "secondary" : "primary"}
                  borderColor="white"
                />
              </Box>

              <Stack spacing={2}>
                <Pagination
                  page={page}
                  count={10}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChange}
                  sx={{ marginBottom: 2 }}
                  color={isDark ? "secondary" : "primary"}
                />
              </Stack>
            </ThemeProvider>
          </PaginationWrapper>

          <PokemonWrapper>
            {partialPokemonData?.map((item, index) => (
              <PokemonCard
                key={index}
                id={item.id}
                pic={item.pic}
                picDet={item.picDet}
                name={item.name}
                height={item.height}
                baseexp={item.baseexp}
                weight={item.weight}
                abilitie={item.abilitie}
                partialPokemonData={partialPokemonData}
                fullPokemonDataFiltered={expFullPokemonDataFiltered}
                expFullPokemonDataFormated={expFullPokemonDataFormated}
              />
            ))}
          </PokemonWrapper>

          <PaginationWrapper>
            <ThemeProvider theme={theme2}>
              <Stack spacing={2}>
                <Pagination
                  page={page}
                  count={10}
                  variant="outlined"
                  shape="rounded"
                  sx={{ marginTop: 2, paddingBottom: 40 }}
                  onChange={handleChange}
                  color={isDark ? "secondary" : "primary"}
                />
              </Stack>
            </ThemeProvider>
          </PaginationWrapper>
        </HomePageWrapper>
      )}
    </>
  );
};
export default HomePage;
