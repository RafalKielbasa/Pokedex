import * as React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Searcher = () => {
  return (
    <Container>
      <TextField id="Searcher" placeholder="Search" />
    </Container>
  );
};

export default Searcher;
