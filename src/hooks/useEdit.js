import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { addAsNew, addToEddited } from '../services/api';
import questionmarkImage from '../assets/new_pokemon_image.png';

export const useEditMutation = (button, pokemon, formik) => {
  return useMutation({
    mutationFn: (pokemonData) => {
      if (button === 'SAVE AS NEW') {
        if (pokemon?.name === formik.values.name) {
          enqueueSnackbar('You have to change name', { variant: 'error' });
        } else {
          pokemonData.image = questionmarkImage;
          addAsNew(pokemonData);
          enqueueSnackbar('Added to database', { variant: 'success' });
        }
      } else {
        if (pokemon.name === formik.values.name) {
          pokemonData.id = pokemon?.id;
          addToEddited(pokemonData);
          enqueueSnackbar('Pokemon edited', { variant: 'success' });
        } else {
          enqueueSnackbar(
            'If you want to update already existing pokemon you have to stay with original pokemon name',
            { variant: 'error' }
          );
        }
      }
    },
  });
};
