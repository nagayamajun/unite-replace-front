import { Socket } from "socket.io-client";

export interface SocketService {
  setSocket(): { socket: Socket };
}