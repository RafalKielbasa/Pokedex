import { SnackbarProvider } from "notistack";
import { NavigationBar, NavigationContainer } from "./Navigation";
import { PokemonCard, PokemonCardContainer, Searcher } from "./Pages/components";
function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <NavigationContainer>
          <NavigationBar />
        </NavigationContainer>
        <Searcher />
        <PokemonCardContainer>
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
          <PokemonCard />
        </PokemonCardContainer>
      </div>
      <div className="Pagination">1,2,3...</div>
    </SnackbarProvider>
  );
}

export default App;
