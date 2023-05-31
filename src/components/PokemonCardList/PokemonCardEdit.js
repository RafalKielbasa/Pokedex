import { Link } from "react-router-dom";
import { Card, Img, Name } from "./PokemonCardEdit.styles";
import { ProjectUrl } from "../../const/ProjectUrl";

export const PokemonCardEdit = ({ props }) => {
  const { image, name } = props;

  return (
    <Card>
      <Img alt="pokemon" src={image} />
      <Name>
        <Link to={`${ProjectUrl.Edit}?name=${name}`}>{name}</Link>
      </Name>
      <Img alt="pokemon" src={image} />
    </Card>
  );
};
