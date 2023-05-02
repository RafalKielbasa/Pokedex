import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NavigationBar, NavigationContainer } from "./Navigation";
import { Searcher, MyPagination } from "./Pages/components";
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
          <Searcher />
          <MainPage />
        </div>
        <MyPagination count={10} pageNumber={1} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;
