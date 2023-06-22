import { createBrowserRouter } from 'react-router-dom';
import { ProjectUrl } from '../const/ProjectUrl';
import { HomePage } from '../pages/HomePage';
import { PokemonDetailsPage } from '../pages/PokemonDetailsPage';
import { SingUpPage } from '../pages/SingUpPage';
import { SignInPage } from '../pages/SignInPage';
import { FavoritePage } from '../pages/FavoritePage';
import { PvpPage } from '../pages/PvpPage';
import { EditAndLogoutPage } from '../pages/EditAndLogoutPage';
import { EditPage } from '../pages/EditPage';
import { Ranking } from '../pages/Ranking';

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
  {
    path: ProjectUrl.Favorite,
    element: <FavoritePage />,
  },
  {
    path: ProjectUrl.PvP,
    element: <PvpPage />,
  },
  {
    path: ProjectUrl.EditAndLogout,
    element: <EditAndLogoutPage />,
  },
  {
    path: ProjectUrl.Edit,
    element: <EditPage />,
  },
  {
    path: ProjectUrl.Ranking,
    element: <Ranking />,
  },
]);
