import { baseUrl } from '@/config/base-url-env.config';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';


export const socket = io(baseUrl,{
    autoConnect:true,
});

/**
 * Custom Hook que retorna estatús de la conexión con la API.
 * @returns {isConnected} Retorna el estaado de la conexión.
 */
export default function useSocketConnection():boolean {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    return isConnected;
}