import React from "react";

import CardMedia from "@mui/material/CardMedia";

const CardImg = ({ dataToPass }) => {
  const {
    name,
    sprites: { front_default },
  } = dataToPass;
  return (
    <CardMedia
      sx={{
        width: 220,
        height: 200,
      }}
      image={front_default}
      title={name}
    />
  );
};

export default CardImg;
