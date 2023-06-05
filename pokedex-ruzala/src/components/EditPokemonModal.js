import {
  Box,
  Button,
  Modal,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useContext } from "react";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { pokemonEditSchema } from "../schemas";
import { GlobalContext } from "../App";
import modifyPokemon from "../functional/modifyPokemon";

export default function EditPokemonModal({ pokemon }) {
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { arrayOfModifiedPokemon, setArrayOfModifiedPokemon, pokemonTypes } =
    useContext(GlobalContext);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (values) => {
    const newPokemon = { ...pokemon };
    newPokemon.name = values.name.toLowerCase();
    newPokemon.types[0].type.name = values.type1;
    if (newPokemon.types[1]) {
      newPokemon.types[1].type.name = values.type2;
    }
    newPokemon.weight = values.weight;
    newPokemon.height = values.height;
    newPokemon.base_experience = Number(values.base_experience);
    console.log(typeof newPokemon.baseExperience);
    modifyPokemon(
      arrayOfModifiedPokemon,
      setArrayOfModifiedPokemon,
      newPokemon
    );
    enqueueSnackbar("Pomyślnie zmodyfikowano pokemona", { variant: "success" });
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        name: `${pokemon.name}`,
        type1: `${pokemon.types[0].type.name}`,
        type2: pokemon.types[1] ? `${pokemon.types[1].type.name}` : undefined,
        weight: `${pokemon.weight}`,
        height: `${pokemon.height}`,
        base_experience: `${pokemon.base_experience}`,
      },
      validationSchema: pokemonEditSchema,
      onSubmit,
    });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    backgroundColor: "primary.light",
    border: "2px solid black",
    boxShadow: 24,
  };
  const scaling = 0.5;
  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Edytuj
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Table sx={{ width: "80%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type(s)</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Height</TableCell>
                  <TableCell>Base Exp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: "5%" }}>{pokemon.id}</TableCell>
                  <TableCell sx={{ width: "5%" }}>
                    {
                      <img
                        src={
                          pokemon.sprites.other["official-artwork"]
                            .front_default
                        }
                        height={`${226 * scaling}px`}
                        alt="pokemonSprite"
                      />
                    }
                  </TableCell>
                  <TableCell>{pokemon.name.toUpperCase()}</TableCell>
                  <TableCell>
                    {pokemon.types.map((element) => {
                      return (
                        <Typography
                          key={`type ${element.type.name} ${pokemon.name}`}
                          sx={{ fontSize: "10px" }}
                        >
                          {element.type.name.toUpperCase()}
                        </Typography>
                      );
                    })}
                  </TableCell>
                  <TableCell>{pokemon.weight}</TableCell>
                  <TableCell>{pokemon.height}</TableCell>
                  <TableCell>{pokemon.base_experience}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Box
                sx={{ display: "flex", flexDirection: "column", padding: "4%" }}
                id="Pokemon Edit Form"
              >
                <TextField
                  margin="normal"
                  error={touched.name && errors.name && true}
                  id="name"
                  name="name"
                  label="Nazwa"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.name && errors.name && `${errors.name}`}
                />
                {pokemonTypes.length > 0 && (
                  <Select
                    id="type1"
                    name="type1"
                    value={pokemon.types[0].type.name}
                    onChange={handleChange}
                  >
                    {pokemonTypes.map((type) => {
                      return (
                        <MenuItem
                          key={`${type.name} type1 type`}
                          value={type.name}
                        >
                          {type.name.toUpperCase()}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
                {pokemonTypes.length > 0 && pokemon.types[1] && (
                  <Select
                    id="type2"
                    name="type2"
                    value={pokemon.types[1].type.name}
                    onChange={handleChange}
                  >
                    {pokemonTypes.map((type) => {
                      return (
                        <MenuItem
                          key={`${type.name} type2 type`}
                          value={type.name}
                        >
                          {type.name.toUpperCase()}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
                <TextField
                  margin="normal"
                  error={touched.weight && errors.weight && true}
                  id="weight"
                  name="weight"
                  label="Waga"
                  value={values.weight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.weight && errors.weight && `${errors.weight}`
                  }
                />
                <TextField
                  margin="normal"
                  error={touched.height && errors.height && true}
                  id="height"
                  name="height"
                  label="Wzrost"
                  value={values.height}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.height && errors.height && `${errors.height}`
                  }
                />
                <TextField
                  margin="normal"
                  error={
                    touched.base_experience && errors.base_experience && true
                  }
                  id="base_experience"
                  name="base_experience"
                  label="Punkty doświadczenia"
                  value={values.base_experience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.base_experience &&
                    errors.base_experience &&
                    `${errors.base_experience}`
                  }
                />
                <Button
                  sx={{ marginBottom: "20%" }}
                  type="submit"
                  color="warning"
                  variant="contained"
                >
                  Zapisz
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
