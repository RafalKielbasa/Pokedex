import { Pagination } from '@mui/material';
import { useContext } from 'react';
import { useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { StyledPagination } from './wrappers/HomePageWrapper/HomePageWrapper.styles';

const PAGE_LIMIT = 15;

export const PagePagination = ({
  allPokemon,
  setPosts,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumber = Math.ceil(allPokemon?.length / PAGE_LIMIT);
  const { currentTheme, changeTheme } = useContext(ThemeContext);

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
    <StyledPagination
      theme={currentTheme}
      count={pageNumber || 0}
      size="large"
      onChange={handleChange}
    />
  );
};
