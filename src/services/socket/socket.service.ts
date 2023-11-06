import { io, Socket } from "socket.io-client";

const BASE_URL = `${process.env.REACT_APP_BASE_ENDPOINT}`;

class SocketService {
  public socket: Socket;

  constructor() {
    this.socket = io(BASE_URL, {
      transports: ["websocket"],
      secure: true
    });
  }

  public socketConnetction(): void {
    this.socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    this.socket.on("disconnect", (reason) => {
      console.log(`Reason: ${reason}`);
      this.socket.connect();
    });

    this.socket.on("connect_error", (error) => {
      console.log(`Error: ${error}`);
      this.socket.connect();
    });
  }
}

export const socketService = new SocketService();
