import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AppContext } from "src/context/AppContext";
import { ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function BasicModal({
  open,
  handleClose,
  winner,
  winnerPic,
  finalResults,
}) {
  const { isDark, theme2 } = useContext(AppContext);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-delete"
      aria-describedby="modal-delete"
    >
      <Box
        sx={style}
        style={{
          backgroundColor: isDark ? "#bcaaa4" : "white",
        }}
      >
        <div style={{ textAlign: "center", paddingTop: "10px" }}>
          <img src={winnerPic} alt={"picture"} />
        </div>
        <Typography
          style={{
            display: "flex",
            textAlign: "center",
          }}
          id="modal-delete"
          variant="h5"
          component="h2"
        >
          <h3>Pokemon {winner} wygrywa !!!</h3>
        </Typography>

        <Typography
          style={{
            display: "flex",
            textAlign: "center",
          }}
        >
          <h4>Za wygraną otrzymuję dodatkowe 10 punktów doświadczenia</h4>
        </Typography>
        <Stack
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <ThemeProvider theme={theme2}>
            <Button
              className="finalResults"
              variant="outlined"
              color={isDark ? "secondary" : "primary"}
              onClick={finalResults}
            >
              Opuść arenę
            </Button>
          </ThemeProvider>
        </Stack>
      </Box>
    </Modal>
  );
}

export function DrawModal({ open2, handleClose, finalResults }) {
  const { isDark, theme, theme2 } = useContext(AppContext);

  return (
    <Modal
      open={open2}
      onClose={handleClose}
      aria-labelledby="modal-delete"
      aria-describedby="modal-delete"
    >
      <Box sx={style}>
        <Typography
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          id="modal-draw"
          variant="h4"
          component="h2"
        >
          <h4>Remis !!!</h4>
        </Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Button
            className="finalResults"
            variant="outlined"
            color={isDark ? "secondary" : "primary"}
            onClick={finalResults}
          >
            Opuść arenę
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
