import styled from 'styled-components';
import img from '../../../assets/arenaPvp.png';
import { Button } from '@mui/material';

export const Container = styled.div`
  background-image: url(${img});
  min-height: 90vh;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 56px;
`;

export const FightButton = styled.button`
  border-radius: 50%;
  align-self: center;
  background: initial;
  border: none;
  padding-top: 56px;
  max-width: 20vw;
  &:hover {
    animation: rotation 2.5s infinite linear;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

export const WinnerAnnouncement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Pokemon Solid', sans-serif;
  font-size: 56px;
  color: #fff;
`;

export const EndButton = styled('Button')`
  width: 50px;
  background-color: inherit;
`;
