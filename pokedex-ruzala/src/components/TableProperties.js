import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function TableProperties({
  pokemons,
  itemsPerPage,
  currentPageSetter,
  itemsPerPageSetter,
  filteredArraySetter,
  pokemonTypes,
}) {
  const [itemsPerPageArray, setItemsPerPageArray] = useState([]);
  const [goToPage, setGoToPage] = useState();

  const handleSearchInput = (e) => {
    currentPageSetter(1);
    pokemons.data &&
      filteredArraySetter(
        pokemons.data.filter((pokemon) => pokemon.name.includes(e.target.value))
      );
  };
  const handleTypeFilter = (e) => {
    currentPageSetter(1);
    pokemons.data &&
      filteredArraySetter(
        pokemons.data.filter((pokemon) =>
          pokemon.types.some((type) => type.type.name.includes(e.target.value))
        )
      );
  };
  const handleItemPerPageChange = (e) => {
    itemsPerPageSetter(e.target.value);
  };
  const handleGoToPageChange = (e) => {
    const value = Number(e.target.value);
    console.log(value);

    if (!isNaN(value)) {
      setGoToPage(value);
    } else {
      setGoToPage(1);
    }
  };
  const handleGoClick = () => {
    const newPage = goToPage;
    currentPageSetter(newPage);
  };

  useEffect(() => {
    for (let i = 6; i < 31; i += 3) {
      if (i === 6) {
        setItemsPerPageArray([i]);
      } else {
        setItemsPerPageArray((prev) => [...prev, i]);
      }
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        padding: "10px",
        border: "3px solid lightblue",
        backgroundColor: "warning.light",
      }}
    >
      <TextField
        label="Search"
        variant="filled"
        sx={{ width: "55%" }}
        onChange={handleSearchInput}
      />
      <Box
        id="goToPageBox"
        sx={{
          display: "flex",
          width: "15%",
          margin: "0 2% 0 2%",
          alignItems: "center",
        }}
      >
        <TextField
          label="To Page"
          variant="outlined"
          sx={{ width: "70%" }}
          onChange={handleGoToPageChange}
        />
        <Button
          variant="outlined"
          onClick={handleGoClick}
          sx={{ width: "30%", color: "black", height: "90%" }}
        >
          GO
        </Button>
      </Box>
      <Select
        sx={{ width: "10%" }}
        label="Pokemons Per Page"
        value={itemsPerPage}
        onChange={handleItemPerPageChange}
      >
        {itemsPerPageArray.map((item) => {
          return <MenuItem value={item}>{`${item}`}</MenuItem>;
        })}
      </Select>
      <Box
        sx={{
          display: "flex",
          width: "84%",
          marginTop: "1%",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          sx={{
            width: "20%",
            height: "80%",
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          Filter by Type
        </Typography>
        <Select
          sx={{ width: "60%", height: "80%" }}
          onChange={handleTypeFilter}
        >
          <MenuItem selected value={""}>
            NO FILTER
          </MenuItem>
          {pokemonTypes.map((type) => {
            return (
              <MenuItem value={type.name}>{type.name.toUpperCase()}</MenuItem>
            );
          })}
        </Select>
      </Box>
    </Box>
  );
}
