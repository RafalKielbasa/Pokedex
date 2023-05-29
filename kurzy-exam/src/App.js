// import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import ThemeContextProvider from "src/context/ThemeContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeContextProvider>
            <RouterProvider router={router} />
          </ThemeContextProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
