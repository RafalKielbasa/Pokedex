import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ setSortBy }) {
  const [age, setAge] = React.useState("");

  return (
    <Box sx={{ minWidth: 120, maxWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sortuj według</InputLabel>
        <Select
          className="select"
          label="Sortuj według"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="height-max">Wzrost rosnąco</MenuItem>
          <MenuItem value="height-min">Wzrost malejąc</MenuItem>
          <MenuItem value="weight-max">Waga rosnąco</MenuItem>
          <MenuItem value="weight-min">Waga malejąco</MenuItem>
          <MenuItem value="experience-max">Doświadczenie rosnąco</MenuItem>
          <MenuItem value="experience-min">Doświadczenie malejąco</MenuItem>
          <MenuItem value="fights-max">Wygrane walki rosnąco</MenuItem>
          <MenuItem value="fights-min">Wygrane walki malejąco</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
