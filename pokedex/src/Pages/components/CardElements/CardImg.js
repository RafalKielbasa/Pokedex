import React from "react";
import CardMedia from "@mui/material/CardMedia";
const CardImg = ({ dataToPass }) => {
  return (
    <CardMedia
      sx={{
        width: 220,
        height: 200,
      }}
      image={dataToPass?.sprites?.front_default}
      title={dataToPass?.name}
    />
  );
};

export default CardImg;
