import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { addAsNew, addToEddited } from '../services/api';
import questionmarkImage from '../assets/new_pokemon_image.png';

export const useEditMutation = (button, pokemon, formik) => {
  return useMutation({
    mutationFn: (pokemonData) => {
      if (button === 'SAVE AS NEW') {
        if (pokemon?.name === formik.values.name) {
          enqueueSnackbar('you have to change name', { variant: 'error' });
        } else {
          pokemonData.image = questionmarkImage;
          addAsNew(pokemonData);
          enqueueSnackbar('Added to database', { variant: 'success' });
        }
      } else {
        pokemonData.id = pokemon?.id;
        addToEddited(pokemonData);
        enqueueSnackbar('Pokemon edited', { variant: 'success' });
      }
    },
  });
};
