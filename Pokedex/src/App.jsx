import Navmenu from './components/Global/Navmenu';
import { ThemeProvider, createTheme, createMuiTheme} from '@mui/material'
import MainPage from './components/MainPage/MainPage'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout'
import { ThemeContext } from './components/Global/ThemeContext';
import LogIn from './components/AccountPages/LogIn';
import UserPage from './components/AccountPages/UserPage';
import LoginWrapper from './components/AccountPages/LoginWrapper';
import { FavoriteProvider } from "./components/Global/ThemeContext";
import Favourite from './components/FavouritePage/Favourite';
import { SnackbarProvider } from 'notistack';
import Arena from './components/ArenaPage/Arena';

const theme = createTheme({
palette: {
  primary: {
    main: '#FECA1E',
    second: '#272D34'
  }
}
})

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <RootLayout />}>
    <Route index element={ <MainPage />} />
    <Route path="/account" element={<LoginWrapper />} />
    <Route path="/favourites" element={<Favourite />} />
    <Route path="/arena" element={<Arena />} />
    {/* <Route path="/user" element={<UserPage/>} /> */}
    {/* <Route path="/docs" element={<MainDashboard />} loader={pokemonDataLoader} /> */}
    </Route>
  )
)
function App() {
  return (


<ThemeProvider theme={theme}>
<ThemeContext.Provider value={theme}>
<SnackbarProvider>
<FavoriteProvider> 
<RouterProvider router={router} />
</FavoriteProvider>
</SnackbarProvider>
</ThemeContext.Provider>
</ThemeProvider>

  );
}

export default App;