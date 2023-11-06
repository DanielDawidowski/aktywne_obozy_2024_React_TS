import React, { FC } from "react";
import type { RouteObject } from "react-router";
import { useRoutes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import { AuthTabs } from "./pages/auth";

export const AppRouter: FC = () => {
  const elements: RouteObject[] = [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/login",
      element: <AuthTabs />
    }
  ];
  return useRoutes(elements);
};
