// hooks/useTiempoMuertoSocket.ts
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

export const useTiempoMuertoSocket = () => {
  useEffect(() => {
    const socket: Socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("🟢 Conectado:", socket.id);
    });

    socket.on("tiempo-muerto:creado", (data) => {
      console.log("CREADO:", data);
    });

    socket.on("tiempo-muerto:finalizado", (data) => {
      console.log("FINALIZADO:", data);
    });

    return () => {
      socket.disconnect();
      console.log("🔴 Desconectado");
    };
  }, []);
};