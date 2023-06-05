import { useMutation } from "@tanstack/react-query";
import { editPost, editPut } from "../services/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ProjectUrl } from "../const/ProjectUrl";

export const useEditMutation = (button, id) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (pokemonData) => {
      if (button === "SAVE AS NEW!") {
        enqueueSnackbar("Added to database", { variant: "success" });
        setTimeout(() => {
          localStorage.removeItem("Pokedex-user");
          navigate(ProjectUrl.Home);
          return editPost(pokemonData);
        }, 2000);
      } else {
        enqueueSnackbar("Pokemon edited", { variant: "success" });
        setTimeout(() => {
          localStorage.removeItem("Pokedex-user");
          navigate(ProjectUrl.Home);
          return editPut(pokemonData, id);
        }, 2000);
      }
    },
  });
};
