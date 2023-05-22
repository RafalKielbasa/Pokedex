import React, { useContext } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";

import GlobalContext from "src/context/GlobalContext";
const Container = styled.div`
  background: ${(prop) => prop.theme.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const Searcher = ({ handleSearcherChange }) => {
  const { theme } = useContext(GlobalContext);
  return (
    <Container theme={theme}>
      <TextField
        label="Wyszukiwarka Pokemon"
        id="Searcher"
        type="text"
        variant="filled"
        onChange={handleSearcherChange}
        InputLabelProps={{
          style: { color: theme.textColor },
        }}
        InputProps={{ style: { color: theme.textColor } }}
        sx={{
          background: theme.bgColor,
          border: theme.searcherBorder,
        }}
      />
    </Container>
  );
};

export default Searcher;
