import { Pagination } from "@mui/material";

export const PagePagination = ({
  setPage,
  page,
  setOffset,
  offset,
  limit,
  setLimit,
}) => {
  const pageNumber = Math.ceil(151 / 15);

  if (page !== 11) {
    setOffset(page * limit - 15);
    setLimit(15);
  } else if (page === 1) {
    setOffset(0);
    setLimit(15);
  } else {
    setOffset(150);
    setLimit(1);
  }

  const handleChange = (_, i) => {
    setPage(i);
  };

  return <Pagination count={pageNumber} onChange={handleChange} size="large" />;
};
