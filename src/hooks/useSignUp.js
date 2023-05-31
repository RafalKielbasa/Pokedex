import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/api";
import { enqueueSnackbar } from "notistack";
import { ProjectUrl } from "../const/ProjectUrl";
import { useNavigate } from "react-router-dom";

export const useSignUpMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userData) => signUp(userData),
    onError: (err) => enqueueSnackbar(`${err}`, { variant: "error" }),

    onSuccess: () => {
      enqueueSnackbar("Successful Registered", { variant: "success" });
      navigate(ProjectUrl.SignIn);
    },
  });
};
