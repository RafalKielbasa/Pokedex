import { createBrowserRouter } from "react-router-dom";
import { ProjectUrl } from "../const/ProjectUrl";
import { HomePage } from "../pages/HomePage";
import { PokemonDetailsPage } from "../pages/PokemonDetailsPage";

export const router = createBrowserRouter([
  {
    path: ProjectUrl.Home,
    element: <HomePage />,

    children: [
      {
        path: ProjectUrl.PokemonDetails,
        element: <PokemonDetailsPage />,
      },
    ],
  },
]);
