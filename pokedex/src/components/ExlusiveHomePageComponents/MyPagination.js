import React, { useContext } from "react";

import styled from "styled-components";

import Pagination from "@mui/material/Pagination";

import GlobalContext from "src/context/GlobalContext";

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
`;

const MyPagination = ({ count, paginationHanldeClick, pageNumber }) => {
  const { theme } = useContext(GlobalContext);

  return (
    <StyledPagination>
      <Pagination
        count={count}
        color="primary"
        onChange={paginationHanldeClick}
        page={pageNumber}
        sx={{
          button: { color: theme.textColor },
        }}
      />
    </StyledPagination>
  );
};

export default MyPagination;
