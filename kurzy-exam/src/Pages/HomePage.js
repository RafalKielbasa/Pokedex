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
  const [localResults, setLocalResults] = useState();
  // const [partialPokemonData, setPartialPokemonData] = useState([]);
  const [fullPokemonData, setFullPokemonData] = useState([]);
  const [expFullPokemonData, setExpFullPokemonData] = useState([]);
  const [fullPokemonDataFiltered, setFullPokemonDataFiltered] = useState([]);

  const queryFullData = useQuery([`/`], () => getFullResults());

  // console.log(`expFullPokemonData`, expFullPokemonData);
  // console.log(`fullPokemonData`, fullPokemonData);
  // console.log(`offset`, offset);

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

  // const queryData = queryFullData?.data?.map((item, index) => ({
  //   name: item.name,
  //   id: index + 1,
  //   favorite: false,
  //   battle: false,
  // }));

  fullPokemonData.length > 150 ? window.location.reload() : {};

  const pageCount = fullPokemonData.length / 15;
  const partialPokemonData = fullPokemonData
    .slice(offset, offset + 15)
    .sort((a, b) => (a.id > b.id ? 1 : -1));

  const inputHandler = (event) => {
    const textFieldText = event.target.value.toLowerCase();
    setInputText(textFieldText);
  };

  // if (fullPokemonData) {
  //   const dataToFavorite = fullPokemonData.map((item) => ({
  //     id: item.id,
  //     pic: item.sprites.front_default,
  //     name: item.name,
  //     height: item.height,
  //   }));
  //   console.log(`dataToFavorite;`, dataToFavorite);
  // }

  // useEffect(() => {
  //   const expFullData = data.map((item) => ({
  //     ...item,
  //     favorite: false,
  //   }));
  //   setExpFullPokemonData(expFullData);
  // }, [queryFullData]);

  useEffect(
    () =>
      fullPokemonData &&
      setFullPokemonDataFiltered(
        fullPokemonData.filter(
          ({ name, height, base_experience, weight }) =>
            name?.toLowerCase().includes(inputText) ||
            height?.toString().toLowerCase().includes(inputText) ||
            base_experience?.toString().toLowerCase().includes(inputText) ||
            weight?.toString().toLowerCase().includes(inputText)
        )
      ),
    [inputText]
  );

  //console.log(`fullPokemonData`, fullPokemonData.name);

  // const responseLocal = axios.get(`http://localhost:3000/queryFullData`);

  // const fetchFavorite = async () => {
  //   const response = await axios.get(`http://localhost:3000/queryFullData/`);
  //   // const filteredData = response?.data.map(({ name }) => name);
  //   return response;
  // };

  // useEffect(() => {
  //   const sendCollection = async () => postData(`queryFullData`, queryData);
  //   sendCollection();
  // }, [queryFullData.status === "success"]);

  // // useEffect(() => {
  // //   const pagefromLS = localStorage.getItem("page");
  // //   if (pagefromLS) {
  // //     setPage(JSON.parse(pagefromLS));
  // //   }
  // // }, []);

  // // useEffect(() => {
  // //   const offSetfromLS = localStorage.getItem("offset");
  // //   if (offSetfromLS) {
  // //     setOffset(JSON.parse(offSetfromLS));
  // //   }
  // // }, []);

  // // const saveToLocalStorage = () => {
  // //   localStorage.setItem("pagePag", JSON.stringify(page));
  // // };

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
                // onClick={saveToLocalStorage}
                sx={{ marginBottom: 2 }}
              />
            </Stack>
          </PaginationWrapper>

          {fullPokemonDataFiltered.length > 0 ? (
            <PokemonWrapper>
              {fullPokemonDataFiltered.map((item, index) => (
                <PokemonCard
                  key={index}
                  id={item.id}
                  pic={item.sprites.front_default}
                  name={item.name}
                  height={item.height}
                  baseexp={item.base_experience}
                  weight={item.weight}
                  abilitie={item.abilities[0].ability.name}
                  fullPokemonData={fullPokemonData}
                  partialPokemonData={partialPokemonData}
                  fullPokemonDataFiltered={fullPokemonDataFiltered}
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
                count={pageCount}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
                // onClick={saveToLocalStorage}
                sx={{ marginBottom: 2 }}
              />
            </Stack>
          </PaginationWrapper>

          <PokemonWrapper>
            {partialPokemonData.map((item, index) => (
              <PokemonCard
                key={index}
                id={item.id}
                pic={item.sprites.front_default}
                name={item.name}
                height={item.height}
                baseexp={item.base_experience}
                weight={item.weight}
                abilitie={item.abilities[0].ability.name}
                fullPokemonData={fullPokemonData}
                partialPokemonData={partialPokemonData}
                fullPokemonDataFiltered={fullPokemonDataFiltered}
              />
            ))}
          </PokemonWrapper>

          <PaginationWrapper>
            <Stack spacing={2}>
              <Pagination
                page={page}
                count={pageCount}
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
