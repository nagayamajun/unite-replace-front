import { axiosInstance } from "@/libs/axios";
import { io } from "socket.io-client";

export const socketService = ({
  setSocket: () => {
    const socket: any = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
      extraHeaders: {
        Authorization: String(
          axiosInstance.defaults.headers.common["Authorization"]
        ),
      },
    });
    return { socket }
  },
});

