import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import { useSnackbar } from "notistack";

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

const BasicModal = ({ open, handleClose, winner }) => {
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-delete"
      aria-describedby="modal-delete"
    >
      <Box sx={style}>
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
          // id="modal-delete"
          // sx={{ mt: 2 }}
        >
          <h4>Za wygraną otrzymuję dodatkowe 10 punktów experience</h4>
          {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 10,
              }}
            > */}
          {/* <Button
                  // key={names}
                  // index={index}
                  variant="outlined"
                  style={{ margin: 10, marginRight: 90 }}
                  onClick={() => {
                    handleClose();
                    // enqueueSnackbar(
                    //   `Data from line ${index + 1} has been deleted !!!`
                    // );
                  }}
                >
                  Yes
                </Button>
                <Button
                  // key={names}
                  // index={index}
                  variant="outlined"
                  style={{ margin: 10 }}
                  onClick={handleClose}
                >
                  No
                </Button> */}
          {/* </div> */}
        </Typography>
      </Box>
    </Modal>
  );
};
export default BasicModal;
