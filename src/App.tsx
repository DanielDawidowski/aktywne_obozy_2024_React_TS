import React, { ReactElement, useEffect } from "react";
import type { FC } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes";
import { socketService } from "./services/socket/socket.service";
import { useAppSelector } from "./redux-toolkit/hooks";
import Toast from "./components/toast/Toast";
import { IToastPosition } from "./interfaces/notification/notification.interface";

const App: FC = (): ReactElement => {
  const { notifications } = useAppSelector((state) => state);

  useEffect(() => {
    socketService?.socketConnetction();
  }, []);

  return (
    <>
      {notifications && notifications.length > 0 && (
        <Toast position={IToastPosition.TOP_RIGHT} toastList={notifications} autoDelete={false} />
      )}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
