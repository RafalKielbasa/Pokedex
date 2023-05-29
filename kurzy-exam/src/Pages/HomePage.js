import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PokemonCard from "../Components/PokemonCards";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { getFullResults } from "src/api/source";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const HomePageWrapper = styled.div`
  margin-bottom: 20px;
  padding: 0px 40px 0px 40px;
`;
const PaginationWrapper = styled.div`
  display: flex;
  align-items: top;
  justify-content: flex-end;
  padding-right: 38px;
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

const HomePage = () => {
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [inputText, setInputText] = useState();
  const [favorites, setFavorites] = useState([]);
  const [favoritesIds, setFavoritesIds] = useState([]);
  const [battle, setBattle] = useState([]);
  const [battleIds, setBattleIds] = useState([]);
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

  const queryFullData = useQuery([`/`], () => getFullResults());

  const getFavorites = async () => {
    const response = await axios.get(`http://localhost:3000/favoriteData/`);
    setFavorites(response.data);
    const getFavoritesIds = response?.data?.map((item) => item.id);
    setFavoritesIds(getFavoritesIds);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const getBattle = async () => {
    const response = await axios.get(`http://localhost:3000/battle/`);
    setBattle(response.data);
    const getBattleIds = response?.data?.map((item) => item.id);
    setBattleIds(getBattleIds);
  };

  useEffect(() => {
    getBattle();
  }, []);

  const getAfterTheBattle = async () => {
    const response = await axios.get(`http://localhost:3000/afterTheBattle/`);
    setAfterBattle(response.data);
    const getBattleIds = response?.data?.map((item) => item.id);
    setAfterBattleIds(getBattleIds);
  };

  useEffect(() => {
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
    if (fullPokemonDataFormated?.length === 150) {
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
  }, [fullPokemonDataFormated, afterBattle]);

  fullPokemonData.length > 150 ? window.location.reload() : {};

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
        <HomePageWrapper>
          <PaginationWrapper>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                size="small"
                id="outlined-basic"
                label="Search"
                variant="outlined"
                onChange={inputHandler}
                sx={{ marginRight: "400px" }}
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
              />
            </Stack>
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
                  favorites={favorites}
                  favoritesIds={favoritesIds}
                  battle={battle}
                  battleIds={battleIds}
                />
              ))}
            </PokemonWrapper>
          ) : (
            <InfoWrapper>
              <h3>Brak wyników wyszukiwania</h3>
            </InfoWrapper>
          )}

          <PaginationWrapper>
            <Stack spacing={2}>
              <Pagination
                page={page}
                count={1}
                variant="outlined"
                shape="rounded"
                sx={{ marginTop: 2 }}
                onChange={handleChange}
              />
            </Stack>
          </PaginationWrapper>
        </HomePageWrapper>
      ) : (
        <HomePageWrapper>
          <PaginationWrapper>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                size="small"
                id="outlined-basic"
                label="Search"
                variant="outlined"
                onChange={inputHandler}
                sx={{ marginRight: "400px" }}
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
              />
            </Stack>
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
                favorites={favorites}
                favoritesIds={favoritesIds}
                battle={battle}
                battleIds={battleIds}
              />
            ))}
          </PokemonWrapper>

          <PaginationWrapper>
            <Stack spacing={2}>
              <Pagination
                page={page}
                count={10}
                variant="outlined"
                shape="rounded"
                sx={{ marginTop: 2 }}
                onChange={handleChange}
              />
            </Stack>
          </PaginationWrapper>
        </HomePageWrapper>
      )}
    </>
  );
};
export default HomePage;
