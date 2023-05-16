import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalContextProvider from "./context/GlobalContextProvider";
import RouterWrapper from "./Router/RouterWrapper";

function App() {
  const queryClient = new QueryClient();
  return (
    <GlobalContextProvider>
      <SnackbarProvider maxSnack={1}>
        <QueryClientProvider client={queryClient}>
          <RouterWrapper />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SnackbarProvider>
    </GlobalContextProvider>
  );
}

export default App;
