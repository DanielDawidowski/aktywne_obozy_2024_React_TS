import React, { ReactElement, useEffect } from "react";
import type { FC } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes";
import { socketService } from "./services/socket/socket.service";

const App: FC = (): ReactElement => {
  useEffect(() => {
    socketService?.socketConnetction();
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
