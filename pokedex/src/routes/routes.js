import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "src/MainPage";
import { HomePage, ArenaPage, LogInPage, RegisterPage, EditPage, DetailedPage } from "src/Pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: "/1",
            element: <DetailedPage />,
          },
        ],
      },
      {
        path: "arena",
        element: <ArenaPage />,
      },
      {
        path: "logIn",
        element: <LogInPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "edit",
        element: <EditPage />,
      },
      {
        path: "*",
        element: <h1>BAD URL</h1>,
      },
    ],
  },
]);
