import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import RouterWrapper from "./Router/RouterWrapper";

function App() {
  const queryClient = new QueryClient();
  return (
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>
        <RouterWrapper />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;
