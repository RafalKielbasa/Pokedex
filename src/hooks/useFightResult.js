import { useMutation } from '@tanstack/react-query';
import { updateAfterFight } from '../services/api';

export const useFightResultMutation = (setResult) => {
  return useMutation({
    mutationFn: (fighters) => updateAfterFight(fighters, setResult),
  });
};
