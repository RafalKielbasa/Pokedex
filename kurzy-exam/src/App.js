// import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import AppContextProvider from "src/context/AppContext";
import RouterWrapper from "src/Routes/Routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <RouterWrapper />
          </AppContextProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
