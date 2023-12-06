import React, { ReactElement } from "react";
import type { FC } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./routes";
import { useAppSelector } from "./redux-toolkit/hooks";
import Toast from "./components/toast/Toast";
import { IToastPosition } from "./interfaces/notification/notification.interface";

const App: FC = (): ReactElement => {
  const { notifications } = useAppSelector((state) => state);

  return (
    <>
      {notifications && notifications.length > 0 && <Toast position={IToastPosition.TOP_RIGHT} toastList={notifications} autoDelete={false} />}
      <Router>
        <AppRouter />
      </Router>
    </>
  );
};

export default App;
