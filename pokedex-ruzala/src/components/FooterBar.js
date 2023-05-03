import { Box } from "@mui/material";

export default function FooterBar() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
        height: "5%",
      }}
    >
      <Box sx={{ height: "5%", backgroundColor: "primary.light" }} />
    </Box>
  );
}
