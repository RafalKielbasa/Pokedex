import React from "react";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";
const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
`;
const MyPagination = ({ count, paginationHanldeClick, pageNumber }) => {
  return (
    <StyledPagination>
      <Pagination
        count={count}
        color="primary"
        onChange={paginationHanldeClick}
        page={pageNumber}
      />
    </StyledPagination>
  );
};

export default MyPagination;
