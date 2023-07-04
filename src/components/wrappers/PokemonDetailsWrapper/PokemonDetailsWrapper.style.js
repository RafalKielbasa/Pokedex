import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SportsMmaIcon from '@mui/icons-material/SportsMma';

export const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 48px;
  max-width: 1980px;
  width: 100%;
`;

export const DetailsSign = styled.span`
  color: #00cc00;
  font-size: 24px;
`;

export const PokedexSign = styled.h1`
  font-size: 48px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.fontColor};
`;

export const PokemonName = styled.h1`
  display: flex;
  justify-content: center;
  text-transform: capitalize;
  color: ${({ theme }) => theme.fontColor};
`;

export const PokemonDetailsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 150px;
`;

export const PokemonInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
`;

export const PropsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  text-align: center;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const PropsName = styled.span`
  font-size: 32px;
  color: ${({ theme }) => theme.fontColor};
`;

export const PropsValue = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.scFontColor};
`;

export const PokemonImg = styled.img`
  width: 25%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const IconsDiv = styled.div`
  display: flex;
  gap: 12px;
`;

export const FavIcon = styled(FavoriteIcon)`
  color: ${({ isactive, theme }) =>
    isactive === 'true' ? 'red' : theme.iconColor};
  transition: 0.1s all ease-in;

  &:hover {
    transform: scale(1.3);
  }
`;

export const FightIcon = styled(SportsMmaIcon)`
  color: ${({ isactive, theme }) =>
    isactive === 'true' ? 'gold' : theme.iconColor};
  &:hover {
    transform: scale(1.3);
  }
`;
