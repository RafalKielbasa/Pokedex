import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Box } from "@mui/material";

const baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<MainLayout />}></Route>)
  );
  return (
    <Box height="100vh">
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
