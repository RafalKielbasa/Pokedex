import { createBrowserRouter } from 'react-router-dom';
import { ProjectUrl } from '../const/ProjectUrl';
import { HomePage } from '../pages/HomePage';

export const router = createBrowserRouter([
  {
    path: ProjectUrl.Home,
    element: <HomePage />,
  },
]);
