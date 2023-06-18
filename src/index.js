import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { UserContextProvider } from './context/UserContext';
import { ThemeProvider } from 'styled-components';
import { theme } from './components/Theme/Theme';
import { GlobalStyle } from './index.styles';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <SnackbarProvider>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </UserContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
