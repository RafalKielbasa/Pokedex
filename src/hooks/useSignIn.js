import { useMutation } from '@tanstack/react-query';
import { signIn } from '../services/api';
import { ProjectUrl } from '../const/ProjectUrl';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export const useSignInMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userData) => signIn(userData),
    onError: (msg) => {
      enqueueSnackbar(`${msg}`, { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Successful logged', { variant: 'success' });

      setTimeout(() => {
        navigate(ProjectUrl.EditAndLogout);
        window.location.reload(false);
      }, 2000);
    },
  });
};
