import React from "react";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { CardImg, CardBoxInfo, HoverCard } from "../CardElements";

function FavoriteCard({ value }) {
  const navigate = useNavigate();
  const dataToPass = value;
  return (
    <HoverCard>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 220,
          background: "#E0E0E0",
        }}
        onClick={() =>
          navigate(`/pokemon/${dataToPass.id}`, { state: dataToPass.name })
        }
      >
        <CardImg dataToPass={dataToPass}></CardImg>
        <CardBoxInfo dataToPass={dataToPass}></CardBoxInfo>
      </Card>
    </HoverCard>
  );
}

export default FavoriteCard;
