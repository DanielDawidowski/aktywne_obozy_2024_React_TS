import React, { FC } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/home/Home";
import { AuthTabs } from "./pages/auth";
import AdminRoute from "./pages/admin/AdminRoute";

import CreateEvent from "./pages/admin/events/CreateEvent";
import AdminEvents from "./pages/admin/events/AdminEvents";
import EditEvent from "./pages/admin/events/EditEvent";
import Events from "./pages/events/Events";
import AdminChat from "./pages/admin/admin-chat/AdminChat";
import Event from "./pages/event/Event";

export const AppRouter: FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<AuthTabs />} />
        <Route path="/event/:eventId" element={<Event />} />
        <Route
          path="/admin/event/create"
          element={
            <AdminRoute>
              <CreateEvent />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/events/list"
          element={
            <AdminRoute>
              <AdminEvents />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/events/update/:eventId"
          element={
            <AdminRoute>
              <EditEvent />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/chat"
          element={
            <AdminRoute>
              <AdminChat />
            </AdminRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};
