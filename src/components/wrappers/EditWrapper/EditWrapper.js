import {
  Container,
  DetailsSign,
  PageWrapper,
  PokemonDetailsWrap,
  PokemonImg,
  PokemonInfo,
  PokemonName,
} from "../PokemonDetailsWrapper/PokemonDetailsWrapper.style";
import { useCorrectPokemonQuery } from "../../../hooks/useCorrecrtPokemon";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { EditForm } from "./EditForm";

export const EditWrapper = () => {
  const [currentButton, setCurrentButton] = useState();
  const [searchParams] = useSearchParams();
  const { data } = useCorrectPokemonQuery(searchParams.get("name"));

  return (
    <PageWrapper>
      <DetailsSign>Edit Pokemon</DetailsSign>
      <PokemonDetailsWrap>
        <PokemonImg alt={data?.data[0]?.name} src={data?.data[0]?.image} />
        <PokemonInfo>
          <PokemonName>{data?.data[0]?.name}</PokemonName>
          <Container>
            <EditForm
              data={data}
              setCurrentButton={setCurrentButton}
              currentButton={currentButton}
            />
          </Container>
        </PokemonInfo>
      </PokemonDetailsWrap>
    </PageWrapper>
  );
};
