import Navmenu from './components/Global/Navmenu';
import { ThemeProvider, createTheme, createMuiTheme} from '@mui/material'
import MainPage from './components/MainPage/MainPage'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout'
import { ThemeContext } from './components/Global/ThemeContext';
import LogIn from './components/AccountPages/LogIn';
import UserPage from './components/AccountPages/UserPage';
import LoginWrapper from './components/AccountPages/LoginWrapper';

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
    {/* <Route path="/user" element={<UserPage/>} /> */}
    {/* <Route path="/docs" element={<MainDashboard />} loader={pokemonDataLoader} /> */}
    </Route>
  )
)
function App() {
  return (


<ThemeProvider theme={theme}>
<ThemeContext.Provider value={theme}>
<RouterProvider router={router} />
</ThemeContext.Provider>
</ThemeProvider>

  );
}

export default App;