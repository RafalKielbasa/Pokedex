import { Pagination } from '@mui/material';
import { useEffect } from 'react';

const PAGE_LIMIT = 15;

export const PagePagination = ({
  allPokemon,
  setPosts,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumber = Math.ceil(allPokemon?.length / PAGE_LIMIT);

  useEffect(() => {
    const indexOfLastPost = currentPage * PAGE_LIMIT;
    const indexOfFirstPost = indexOfLastPost - PAGE_LIMIT;
    const currentPosts = allPokemon?.slice(indexOfFirstPost, indexOfLastPost);
    setPosts(currentPosts);
  }, [allPokemon, currentPage, setPosts]);

  const handleChange = (_, i) => {
    setCurrentPage(i);
  };

  return (
    <Pagination count={pageNumber || 0} size="large" onChange={handleChange} />
  );
};
