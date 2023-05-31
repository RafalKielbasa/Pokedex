import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { UserContextProvider } from "./context/UserContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
