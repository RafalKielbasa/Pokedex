import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NavigationBar, NavigationContainer } from "./Navigation";
import { MainPage } from "./Pages";

function App() {
  const queryClient = new QueryClient();
  return (
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <NavigationContainer>
            <NavigationBar />
          </NavigationContainer>
          <MainPage />
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;
