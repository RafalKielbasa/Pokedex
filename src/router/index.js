import { createBrowserRouter } from "react-router-dom";
import { ProjectUrl } from "../const/ProjectUrl";
import { HomePage } from "../pages/HomePage";
import { PokemonDetailsPage } from "../pages/PokemonDetailsPage";
import { SingUpPage } from "../pages/SingUpPage";
import { SignInPage } from "../pages/SignInPage";

export const router = createBrowserRouter([
  {
    path: ProjectUrl.Home,
    element: <HomePage />,
  },
  {
    path: ProjectUrl.PokemonDetails,
    element: <PokemonDetailsPage />,
  },
  {
    path: ProjectUrl.SingUp,
    element: <SingUpPage />,
  },
  {
    path: ProjectUrl.SignIn,
    element: <SignInPage />,
  },
]);
