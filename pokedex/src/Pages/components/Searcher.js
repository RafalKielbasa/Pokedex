import * as React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const Searcher = ({ handleSearcherChange }) => {
  return (
    <Container>
      <TextField id="Searcher" placeholder="Search" type="text" onChange={handleSearcherChange} />
    </Container>
  );
};

export default Searcher;
