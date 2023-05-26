import React, { useContext } from "react";
import GlobalContext from "src/context/GlobalContext";
import styled from "styled-components";
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StatsContainer = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-evenly;
`;
const ResultSpan = styled.span`
  font-weight: bold;
  border: 1px solid ${(prop) => prop.theme.textColor};
  width: 80px;
  display: flex;
  justify-content: center;
  background-color: ${(prop) => prop.theme.bgCardColor};
  color: ${(prop) => prop.theme.textColor};
`;
const ResultNames = styled.span`
  font-weight: bold;
  width: 80px;
  display: flex;
  justify-content: center;
  color: ${(prop) => prop.theme.textColor};
`;
const BattleStats = ({ winValue, lossValue, tieValue }) => {
  const { theme } = useContext(GlobalContext);
  return (
    <MainContainer>
      <StatsContainer>
        <ResultNames theme={theme}>Wygrane</ResultNames>
        <ResultNames theme={theme}>Porażki</ResultNames>
        <ResultNames theme={theme}>Remisy</ResultNames>
      </StatsContainer>
      <StatsContainer>
        <ResultSpan theme={theme}>{winValue}</ResultSpan>
        <ResultSpan theme={theme}>{lossValue}</ResultSpan>
        <ResultSpan theme={theme}>{tieValue}</ResultSpan>
      </StatsContainer>
    </MainContainer>
  );
};

export default BattleStats;
