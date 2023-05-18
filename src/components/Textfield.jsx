import * as React from "react";
import { Box, TextField } from "@mui/material";

const Textfield = ({ setSearch, search }) => {
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
};

export default Textfield;
