import React, { useContext } from "react";

import { Card, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import styled from "styled-components";

import GlobalContext from "src/context/GlobalContext";

import { CardImg, CardBoxInfo, HoverCard } from "../cardElements";
import { BattleStats } from "../exlusiveArenaPageComponents";
import { ArenaCardContainer } from "../cardContainers";

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const ArenaCard = ({ value, deleteFighter, opacity, winValue, lossValue, tieValue }) => {
  const dataToPass = value;
  const { theme } = useContext(GlobalContext);

  return (
    <ArenaCardContainer>
      <HoverCard>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 250,
            background: theme.bgCardColor,
            color: theme.textColor,
            opacity: opacity || 1,
          }}
        >
          <ButtonContainer>
            <IconButton aria-label="fight" onClick={deleteFighter} sx={{ color: theme.textColor }}>
              <ClearIcon />
            </IconButton>
          </ButtonContainer>
          <CardImg dataToPass={dataToPass}></CardImg>
          <CardBoxInfo dataToPass={dataToPass}></CardBoxInfo>
        </Card>
      </HoverCard>
      <BattleStats winValue={winValue} lossValue={lossValue} tieValue={tieValue} />
    </ArenaCardContainer>
  );
};

export default ArenaCard;
