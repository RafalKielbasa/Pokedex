import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/api';

export const useUserQuery = (id) => {
  return useQuery({
    queryKey: ['get-user'],
    queryFn: () => getCurrentUser(id),
    select: (data) => {
      return data?.data[0];
    },
  });
};
