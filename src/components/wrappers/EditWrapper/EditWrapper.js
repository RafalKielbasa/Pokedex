import {
  DetailsSign,
  PageWrapper,
  PokemonDetailsWrap,
  PokemonImg,
  PokemonInfo,
} from '../PokemonDetailsWrapper/PokemonDetailsWrapper.style';
import { useState } from 'react';
import { EditForm } from './EditForm';
import { InputWrapper } from './EditWrapper.style';

export const EditWrapper = ({ pokemon, length }) => {
  const [currentButton, setCurrentButton] = useState();

  return (
    <PageWrapper>
      <DetailsSign>Edit Pokemon</DetailsSign>
      <PokemonDetailsWrap>
        <PokemonImg alt={pokemon?.name} src={pokemon?.image} />
        <PokemonInfo>
          <InputWrapper>
            <EditForm
              pokemon={pokemon}
              setCurrentButton={setCurrentButton}
              currentButton={currentButton}
              length={length}
            />
          </InputWrapper>
        </PokemonInfo>
      </PokemonDetailsWrap>
    </PageWrapper>
  );
};
