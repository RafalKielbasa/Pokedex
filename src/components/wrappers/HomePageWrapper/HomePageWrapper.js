import { PokemonCard } from '../../PokemonCard/PokemonCard';
import {
  Header,
  PageWrapper,
  PaginationWrapper,
  PokemonWrapper,
  StyledTextField,
} from './HomePageWrapper.styles';
import { useContext, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { PagePagination } from '../../PagePagination';
import { v4 } from 'uuid';
import { ThemeContext } from '../../../context/ThemeContext';

export const HomePageWrapper = ({ pokemonData }) => {
  const [value, setValue] = useState('');
  const debouncedSearch = useDebounce(value);
  const [posts, setPosts] = useState([pokemonData || []]);
  const [currentPage, setCurrentPage] = useState(1);
  const { currentTheme } = useContext(ThemeContext);

  return (
    <PageWrapper>
      <Header>
        <StyledTextField
          theme={currentTheme}
          placeholder="Search"
          variant="outlined"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </Header>
      <PokemonWrapper>
        {value?.length > 0
          ? pokemonData
              ?.filter((pokemon) => {
                return pokemon.name.startsWith(debouncedSearch)
                  ? pokemon
                  : null;
              })
              .map((pokemon) => {
                return <PokemonCard props={pokemon} key={v4()} />;
              })
          : posts?.map((pokemon) => {
              return <PokemonCard props={pokemon} key={v4()} />;
            })}
      </PokemonWrapper>
      <PaginationWrapper>
        {!value ? (
          <PagePagination
            allPokemon={pokemonData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setPosts={setPosts}
            posts={posts}
          />
        ) : null}
      </PaginationWrapper>
    </PageWrapper>
  );
};
