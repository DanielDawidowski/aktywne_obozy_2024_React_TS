import React, { FC } from "react";
import type { RouteObject } from "react-router";
import { useRoutes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import { AuthTabs } from "./pages/auth";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateEvent from "./pages/admin/events/CreateEvent";
import AdminEvents from "./pages/admin/events/AdminEvents";

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
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "event/create",
          element: <CreateEvent />
        },
        // {
        //   path: "clients",
        //   element: <AdminClients />
        // },
        // {
        //   path: "client/:clientId",
        //   element: <EditClient />
        // },
        {
          path: "events/list",
          element: <AdminEvents />
        }
        // {
        //   path: "events/update/:eventId",
        //   element: <EditEvent />
        // }
      ]
    }
  ];
  return useRoutes(elements);
};
