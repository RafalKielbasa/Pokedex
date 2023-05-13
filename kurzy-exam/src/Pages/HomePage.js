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
import { faker } from "@faker-js/faker";

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

  console.log(`fullPokemonData`, fullPokemonData);
  // console.log(`queryFullData`, queryFullData);
  // console.log(`offset `, offset);

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

  // useEffect(() => {
  const pageCount = fullPokemonData.length / 15;
  const partial = fullPokemonData
    .slice(offset, offset + 15)
    .sort((a, b) => (a.id > b.id ? 1 : -1));
  console.log(`partial`, partial);

  // }, [offset]);

  // if (fullPokemonData.length === 150) {
  //   setFullPokemonData((prevState) => ({
  //     ...prevState,
  //     offset: offset,
  //     numberPerPage: 10,
  //     pageCount: 0,
  //     currentData: [],
  //     pageCount: fullPokemonData.length / prevState.numberPerPage,
  //   }));
  // }

  // useEffect(() => {}, [fullPokemonData.length > 0]);
  //

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
  // return (
  //   <div>
  //     {setFullPokemonData.currentData &&
  //       setFullPokemonData.currentData.map((item, index) => (
  //         <div key={item.id} className="post">
  //           <h3>{`${item.title} - ${item.id}`}</h3>
  //           <p>{item.body}</p>
  //         </div>
  //       ))}
  //     <ReactPaginate
  //       previousLabel={"previous"}
  //       nextLabel={"next"}
  //       breakLabel={"..."}
  //       pageCount={setFullPokemonData.pageCount}
  //       marginPagesDisplayed={2}
  //       pageRangeDisplayed={5}
  //       // onPageChange={handlePageClick}
  //       containerClassName={"pagination"}
  //       activeClassName={"active"}
  //     />
  //     <Box
  //       component="form"
  //       // sx={{
  //       //   "& > :not(style)": { m: 1, width: "25ch" },
  //       // }}

  //       noValidate
  //       autoComplete="off"
  //     >
  //       <TextField
  //         size="small"
  //         id="outlined-basic"
  //         label="Search"
  //         variant="outlined"
  //         onChange={inputHandler}
  //         sx={{ marginRight: "400px" }}
  //       />
  //     </Box>
  //   </div>
  // );

  //

  // useEffect(() => {
  //   async function getPokemonData() {
  //     queryPartialData?.data?.map(async (item) => {
  //       const result = await axios.get(item?.url);
  //       setPartialPokemonData((resultUrl) => {
  //         resultUrl = [...resultUrl, result?.data].sort((a, b) =>
  //           a.id > b.id ? 1 : -1
  //         );
  //         return resultUrl;
  //       });
  //     });
  //   }
  //   // setPartialPokemonData([]);
  //   getPokemonData();
  // }, [offset, queryPartialData.data]);

  // // query.data.map((item) => console.log(`item`, item));
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
    // setPartialPokemonData([]);
    // setFullPokemonData([]);
    // setUrl(`${BASE_URL}?limit=15&offset=${(value - 1) * 15}`);
    // setPage(value);
    // setOffset((value - 1) * 15);
    // localStorage.setItem("page", JSON.stringify(value));
    // localStorage.setItem("offset", JSON.stringify(value - 1) * 15);
  };
  // let inputHandler = (event) => {
  //   const textFieldText = event.target.value.toLowerCase();
  //   setInputText(textFieldText);
  // };

  // inputText ? fullPokemonData : partialPokemonData;

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
