import { Body, Container, PropsDiv, WrapperDiv } from "./PokemonCard.styles";

export const PokemonCard = (props) => {
  const { name, height, base_experience, weight, ability, img } = props;

  return (
    <WrapperDiv>
      <img
        src={
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        }
        alt={`${name} pokemon`}
      ></img>

      <Body>
        <div>Pokemon</div>
        <Container>
          <PropsDiv>
            <span>Height</span>
            <span>100</span>
          </PropsDiv>
          <PropsDiv>
            <span>Base Experience</span>
            <span>100</span>
          </PropsDiv>
          <PropsDiv>
            <span>Weight</span>
            <span>100</span>
          </PropsDiv>
          <PropsDiv>
            <span>Ability</span>
            <span>100</span>
          </PropsDiv>
        </Container>
      </Body>
    </WrapperDiv>
  );
};
