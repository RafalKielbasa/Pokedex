import { Pagination } from "@mui/material";

export const PagePagination = ({ pokemonData, setCurrentPage }) => {
  const pageNumber = Math.ceil(pokemonData?.length / 15);

  const handleChange = (_, i) => {
    setCurrentPage(i);
  };

  return (
    <Pagination count={pageNumber || 0} onChange={handleChange} size="large" />
  );
};
