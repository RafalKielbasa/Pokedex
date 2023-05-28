import React, { useContext } from "react";

import Card from "@mui/material/Card";

import GlobalContext from "src/context/GlobalContext";

function BlankCard({ value }) {
  const { theme } = useContext(GlobalContext);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 220,
        height: 300,
        background: theme.bgCardColor,
        color: theme.textColor,
        fontSize: 24,
        fontWeight: "bold",
      }}
    >
      {value}
    </Card>
  );
}

export default BlankCard;
