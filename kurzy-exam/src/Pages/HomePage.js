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
import ReactPaginate from "react-paginate";

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
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [inputText, setInputText] = useState();
  // const [partialPokemonData, setPartialPokemonData] = useState([]);
  const [fullPokemonData, setFullPokemonData] = useState([]);

  const queryPartialData = useQuery([`/`, offset], () =>
    getPartialResults(`${offset}`)
  );
  const queryFullData = useQuery([`/`], () => getFullResults());

  console.log(`fullPokemonData`, fullPokemonData);
  // console.log(`queryFullData`, queryFullData);
  console.log(`offset`, offset);
  console.log(`page`, page);

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

  const pageCount = fullPokemonData.length / 15;
  const partialPokemonData = fullPokemonData
    .slice(offset, offset + 15)
    .sort((a, b) => (a.id > b.id ? 1 : -1));
  console.log(`partialPokemonData`, partialPokemonData);

  // const [pagination, setPagination] = useState({
  //   data: new Array(1000).fill().map((value, index) => ({
  //     id: index,
  //     title: faker.lorem.words(5),
  //     body: faker.lorem.sentences(8),
  //   })),
  //   offset: 0,
  //   numberPerPage: 10,
  //   pageCount: 0,
  //   currentData: [],
  // });

  // useEffect(() => {
  //   setFullPokemonData((prevState) => ({
  //     ...prevState,
  // offset: offset,
  // numberPerPage: 10,
  // pageCount: 0,
  // currentData: [],
  // pageCount: fullPokemonData.length / fullPokemonData.numberPerPage,
  // currentData: prevState.slice(
  //   fullPokemonData.offset,
  //   fullPokemonData.offset + fullPokemonData.numberPerPage
  // ),
  //   }));
  // }, [fullPokemonData.numberPerPage, fullPokemonData.offset]);

  // const handlePageClick = (event) => {
  //   const selected = event.selected;
  //   const offset = selected * pagination.numberPerPage;
  //   setPagination({ ...pagination, offset });
  // };
  let inputHandler = (event) => {
    const textFieldText = event.target.value.toLowerCase();
    setInputText(textFieldText);
  };
  //
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
            {fullPokemonData.map((item, index) => (
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
                // onClick={() => saveToLocalStorage()}
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
                // onClick={() => saveToLocalStorage()}
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
