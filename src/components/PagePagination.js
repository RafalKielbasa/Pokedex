import { Pagination } from '@mui/material';
import { useEffect } from 'react';

export const PagePagination = ({
  setPage,
  page,
  setOffset,
  offset,
  limit,
  setLimit,
}) => {
  const pageLimit = 15;
  const pokemonLimit = 151;
  const pageNumber = Math.ceil(pokemonLimit / pageLimit);

  useEffect(() => {
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
  }, [limit, page, setLimit, setOffset]);

  const handleChange = (_, i) => {
    setPage(i);
  };

  return <Pagination count={pageNumber} onChange={handleChange} size="large" />;
};
