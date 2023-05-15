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

const editSchema = Yup.object().shape({
  height: Yup.number(),
  weight: Yup.number(),
  base_experience: Yup.number(),
  ability: Yup.string(),
});

export const EditWrapper = (props) => {
  const { name, height, base_experience, weight, ability, img } = props;
  const defaultValueTemp = 100;

  const formik = useFormik({
    initialValues: {
      height: defaultValueTemp,
      weight: defaultValueTemp,
      base_experience: defaultValueTemp,
      ability: "",
    },
    validationSchema: editSchema,
    onSubmit: () => {
      console.log("submited");
    },
  });

  return (
    <PageWrapper>
      <DetailsSign>Edit Pokemon</DetailsSign>
      <PokemonDetailsWrap>
        <PokemonImg
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          }
          alt={`${name}`}
        />
        <PokemonInfo>
          <PokemonName>Pokemon Name</PokemonName>
          <Container>
            <PropsDiv>
              <Label htmlFor="height">Height</Label>
              <Input
                name="height"
                type="text"
                placeholder={defaultValueTemp}
                value={formik.values.height}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </PropsDiv>
            <PropsDiv>
              <Label htmlFor="baseExperience">Base Experience</Label>
              <Input
                name="baseExperience"
                type="text"
                placeholder={defaultValueTemp}
                value={formik.values.base_experience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </PropsDiv>
            <PropsDiv>
              <Label htmlFor="weight">Weight</Label>
              <Input
                name="weight"
                type="text"
                placeholder={defaultValueTemp}
                value={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </PropsDiv>
            <PropsDiv>
              <Label htmlFor="ability">Ability</Label>
              <Input
                name="ability"
                type="text"
                placeholder={defaultValueTemp}
                value={formik.values.ability}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </PropsDiv>
          </Container>
        </PokemonInfo>
      </PokemonDetailsWrap>
      <Button variant="contained" type="submit">
        Save!
      </Button>
    </PageWrapper>
  );
};
