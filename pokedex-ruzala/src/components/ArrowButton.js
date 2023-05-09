import { IconButton } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { ArrowForwardIos } from "@mui/icons-material";

export default function ArrowButton({ onClick, variant }) {
  return (
    <IconButton
      sx={{
        background: "rgba(0, 0, 0, 0.2)",
        borderRadius: "0",
        width: "10%",
      }}
      onClick={() => {
        onClick();
      }}
    >
      {variant === "forward" ? <ArrowForwardIos /> : <ArrowBackIos />}
    </IconButton>
  );
}
