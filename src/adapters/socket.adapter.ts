import { SocketService } from "@/application/ports/socketService";
import { socketService } from "@/infrastructures/frameworks/socket";


export const useSocket = (): SocketService => {
  return {
    setSocket() {
        return socketService.setSocket();
    },
  }
};