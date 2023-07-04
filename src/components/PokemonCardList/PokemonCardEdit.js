import { Link } from 'react-router-dom';
import { Card, Img, Name } from './PokemonCardEdit.styles';
import { ProjectUrl } from '../../const/ProjectUrl';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const PokemonCardEdit = ({ props }) => {
  const { image, name } = props;
  const { currentTheme, changeTheme } = useContext(ThemeContext);

  return (
    <Card theme={currentTheme}>
      <Img alt="pokemon" src={image} />
      <Name>
        <Link to={`${ProjectUrl.Edit}?name=${name}`}>{name}</Link>
      </Name>
      <Img alt="pokemon" src={image} />
    </Card>
  );
};
