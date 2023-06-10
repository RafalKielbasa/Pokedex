import { Pagination } from '@mui/material';

export const PagePagination = ({
  setPage,
  page,
  setOffset,
  limit,
  setLimit,
}) => {
  const pageNumber = Math.ceil(151 / 15);

  page === 1 ? setOffset(0) : setOffset(page * 15 - 15);

  const handleChange = (_, i) => {
    setPage(i);
  };

  return <Pagination count={pageNumber} onChange={handleChange} size="large" />;
};
