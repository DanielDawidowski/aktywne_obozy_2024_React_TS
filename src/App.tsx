import React, { useState, useEffect } from "react";
import type { FC, ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./routes";
import { useAppSelector } from "./redux-toolkit/hooks";
import Toast from "./components/toast/Toast";
import { IToastPosition } from "./interfaces/notification/notification.interface";
import Loader, { IStoredLoader } from "./components/loader/Loader";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import useLocalStorage from "./hooks/useLocalStorage";

const App: FC = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);

  const { notifications } = useAppSelector((state) => state);

  const storedLoader = useLocalStorage<IStoredLoader>("loader");
  const getLoader = storedLoader.get();
  const showLoader = getLoader?.shown;

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <AnimatePresence>
      {loading && !showLoader ? (
        <Loader setLoading={setLoading} />
      ) : (
        <>
          {notifications && notifications.length > 0 && <Toast position={IToastPosition.TOP_RIGHT} toastList={notifications} autoDelete={false} />}
          <Router>
            <AppRouter />
          </Router>
        </>
      )}
    </AnimatePresence>
  );
};

export default App;
