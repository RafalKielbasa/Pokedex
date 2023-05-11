import { EmptyPokemonCard } from "../../EmptyPokemonCard/EmptyPokemonCard";
import { Button, CardWrapper, Container } from "./Pvp.style";
import img from "../../../assets/startFight.png";

export const Pvp = () => {
  return (
    <Container>
      <Button>
        <img src={img} />
      </Button>
      <CardWrapper>
        {new Array(2).fill(true).map((_, index) => (
          <EmptyPokemonCard key={index} />
        ))}
      </CardWrapper>
    </Container>
  );
};
