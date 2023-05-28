import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import { CardImg, CardBoxInfo, HoverCard } from "../cardElements";

import GlobalContext from "src/context/GlobalContext";

const PokemonCard = ({ value }) => {
  const navigate = useNavigate();
  const dataToPass = value;
  const { theme } = useContext(GlobalContext);

  return (
    <HoverCard>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 220,
          background: theme.bgCardColor,
          color: theme.textColor,
        }}
        onClick={() => navigate(`/pokemon/${dataToPass?.name}`)}
      >
        <CardImg dataToPass={dataToPass}></CardImg>
        <CardBoxInfo dataToPass={dataToPass}></CardBoxInfo>
      </Card>
    </HoverCard>
  );
};

export default PokemonCard;
