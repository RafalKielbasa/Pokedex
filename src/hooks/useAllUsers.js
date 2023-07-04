import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/api";

export const useAllUsersQuery = () => {
  return useQuery({
    queryKey: ["get-all-users"],
    queryFn: () => getAllUsers(),
  });
};
