import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Box } from "@mui/material";
import { HomePage, Arena, Favorites, Login, Register } from "./pages";
import { useQuery } from "@tanstack/react-query";
import fetchData from "./fetching/fetchData";

const baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["collection"],
    queryFn: () => fetchData(baseURL),
    staleTime: 1000000,
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {data && <Route index element={<HomePage collection={data} />} />}

        <Route path="arena" element={<Arena />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    )
  );

  return (
    <Box>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
