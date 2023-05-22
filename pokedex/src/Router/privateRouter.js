import { createBrowserRouter } from "react-router-dom";
import MainPage from "src/Pages/MainPage";
import {
  HomePage,
  ArenaPage,
  EditPage,
  DetailedPage,
  FavoritesPage,
} from "src/Pages/ContentPages";
export const privateRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "favourites",
        element: <FavoritesPage />,
      },
      {
        path: "arena",
        element: <ArenaPage />,
      },
      {
        path: "edit",
        element: <EditPage />,
      },
      {
        path: "*",
        element: <h1>BAD URL</h1>,
      },
      {
        path: "pokemon/:name",
        element: <DetailedPage />,
      },
    ],
  },
]);
