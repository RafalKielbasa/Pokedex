import React from "react";
import Card from "@mui/material/Card";
function BlankCard({ value }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 220,
        height: 300,
        background: "#E0E0E0",
        fontSize: 24,
        fontWeight: "bold",
      }}
    >
      {value}
    </Card>
  );
}

export default BlankCard;
