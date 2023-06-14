// import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import AppContextProvider from "src/context/AppContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <RouterProvider router={router} />
          </AppContextProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
