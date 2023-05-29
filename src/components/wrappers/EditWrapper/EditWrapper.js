import * as Yup from "yup";
import {
  Container,
  DetailsSign,
  PageWrapper,
  PokemonDetailsWrap,
  PokemonImg,
  PokemonInfo,
  PokemonName,
  PropsDiv,
} from "../PokemonDetailsWrapper/PokemonDetailsWrapper.style";
import { useFormik } from "formik";
import { Input, Label } from "./EditWrapper.style";
import { Button } from "@mui/material";
import { useCorrectPokemonQuery } from "../../../hooks/useCorrecrtPokemon";
import { useSearchParams } from "react-router-dom";
import { useEditMutation } from "../../../hooks/useEdit";
import { useState } from "react";
import { EditForm } from "./EditForm";

// const editSchema = Yup.object().shape({
//   height: Yup.number(),
//   weight: Yup.number(),
//   base_experience: Yup.number(),
//   ability: Yup.string(),
// });

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
