import styled from 'styled-components';
import img from '../../../assets/arenaPvp.png';

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

export const EndButton = styled.button`
  width: 50px;
  background-color: inherit;
  width: 100px;
  border: 1px solid white;
  color: white;
  font-size: 24px;
  border-radius: 20px;
  transition: 0.2s all ease-in;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
    background-color: #f5f5f5;
    color: black;
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f3f3f3;
  border-radius: 10px;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  border-radius: 10px;
  background-color: #4caf50;
  transition: width 0.3s ease-in-out;
`;

export const LosingPokemon = styled.div`
  opacity: 0.2;
`;
