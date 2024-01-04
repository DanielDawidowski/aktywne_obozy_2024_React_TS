import React, { lazy } from "react";
import type { FC } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthTabs } from "./pages/auth";
import ScrollToTop from "./utils/scrollToTop";
// import Temp from "./pages/temp/Temp";

const Home = lazy(() => import("./pages/home/Home"));
const AdminRoute = lazy(() => import("./pages/admin/AdminRoute"));
const CreateEvent = lazy(() => import("./pages/admin/events/CreateEvent"));
const AdminEvents = lazy(() => import("./pages/admin/events/AdminEvents"));
const EditEvent = lazy(() => import("./pages/admin/events/EditEvent"));
const Events = lazy(() => import("./pages/events/Events"));
const AdminChat = lazy(() => import("./pages/admin/admin-chat/AdminChat"));
const Event = lazy(() => import("./pages/event/Event"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const EditSettings = lazy(() => import("./pages/admin/settings-chat/EditSettings"));
const Clients = lazy(() => import("./pages/admin/clients/ClientList"));

export const AppRouter: FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        {/* <Route index element={<Temp />} /> */}
        <Route index element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<AuthTabs />} />
        <Route path="/event/:eventId" element={<Event />} />
        <Route path="/contact" element={<Contact />} />
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
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <EditSettings />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/clients"
          element={
            <AdminRoute>
              <Clients />
            </AdminRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};
