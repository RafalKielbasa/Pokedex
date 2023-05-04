import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Textfield({ setUrl, setSearch, search }) {
  const test = (name) => {
    setSearch(name);
  };
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
    >
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </Box>
  );
}
