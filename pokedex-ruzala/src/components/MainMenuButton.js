import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

function MainMenuButton({ logo, label, navigation }) {
  const navigate = useNavigate();
  return (
    <Button
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "30%",
        height: "40%",
        margin: "3%",
        position: "relative",
        backgroundColor: "rgba(0, 106, 128, 0.5)",
        borderRadius: "15px",
        "&:hover": { transform: "scale(1.07)" },
      }}
      onClick={() => {
        navigate(`${navigation}`);
      }}
    >
      <img src={logo} alt="menu-button-logo" height="200px" width="200px" />
      <Box sx={{ height: "10%", color: "black" }}>{`${label}`}</Box>
    </Button>
  );
}

export default MainMenuButton;
