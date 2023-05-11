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
import { getPartialResults } from "src/api/source";
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

const HomePage = () => {
  // const [url, setUrl] = useState(`${BASE_URL}?limit=15&offset=0`);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [inputText, setInputText] = useState();
  const [partialPokemonData, setPartialPokemonData] = useState([]);
  const [fullPokemonData, setFullPokemonData] = useState([]);
  const [dataToShow, setdataToShow] = useState([]);

  const queryPartialData = useQuery([`/`, offset], () =>
    getPartialResults(`${offset}`)
  );
  const queryFullData = useQuery([`/`], () => getFullResults());

  console.log(`queryPartialData`, queryPartialData);
  console.log(`partialPokemonData`, partialPokemonData);
  console.log(`offset `, offset);

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
  }, [inputText]);

  useEffect(() => {
    async function getPokemonData() {
      queryPartialData?.data?.map(async (item) => {
        const result = await axios.get(item?.url);
        setPartialPokemonData((resultUrl) => {
          resultUrl = [...resultUrl, result?.data].sort((a, b) =>
            a.id > b.id ? 1 : -1
          );
          return resultUrl;
        });
      });
    }
    // setPartialPokemonData([]);
    getPokemonData();
  }, [offset, queryPartialData.data]);

  // query.data.map((item) => console.log(`item`, item));
  // useEffect(() => {
  //   const pagefromLS = localStorage.getItem("page");
  //   if (pagefromLS) {
  //     setPage(JSON.parse(pagefromLS));
  //   }
  // }, []);

  // useEffect(() => {
  //   const offSetfromLS = localStorage.getItem("offset");
  //   if (offSetfromLS) {
  //     setOffset(JSON.parse(offSetfromLS));
  //   }
  // }, []);

  // const saveToLocalStorage = () => {
  //   localStorage.setItem("pagePag", JSON.stringify(page));
  // };

  const handleChange = (event, value) => {
    setPartialPokemonData([]);
    setFullPokemonData([]);
    // setUrl(`${BASE_URL}?limit=15&offset=${(value - 1) * 15}`);
    setPage(value);
    setOffset((value - 1) * 15);
    // localStorage.setItem("page", JSON.stringify(value));
    // localStorage.setItem("offset", JSON.stringify(value - 1) * 15);
  };
  let inputHandler = (event) => {
    const textFieldText = event.target.value.toLowerCase();
    setInputText(textFieldText);
  };

  inputText ? fullPokemonData : partialPokemonData;

  return (
    <HomePageWrapper>
      <PaginationWrapper>
        <Box
          component="form"
          // sx={{
          //   "& > :not(style)": { m: 1, width: "25ch" },
          // }}

          noValidate
          autoComplete="off"
        >
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
            partialPokemonData={partialPokemonData}
            // onClick={() => saveToLocalStorage()}
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
  );
};
export default HomePage;
