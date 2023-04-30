import { SnackbarProvider } from "notistack";
import { NavigationBar, NavigationContainer } from "./Navigation";
import { Searcher } from "./Pages/components";
function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <NavigationContainer>
          <NavigationBar />
        </NavigationContainer>
        <div className="HomePage">
          <Searcher />
          <div className="RowForcards">
            <span className="card">CARD 1</span>
            <span className="card">CARD 2</span>
            <span className="card">CARD 3</span>
          </div>
          <div className="RowForcards">
            <span className="card">CARD 1</span>
            <span className="card">CARD 2</span>
            <span className="card">CARD 3</span>
          </div>
          <div className="RowForcards">
            <span className="card">CARD 1</span>
            <span className="card">CARD 2</span>
            <span className="card">CARD 3</span>
          </div>
        </div>
        <div className="Pagination">1,2,3...</div>
      </div>
    </SnackbarProvider>
  );
}

export default App;
