import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [orderUpdates, setOrderUpdates] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('orderUpdate', (update) => {
      setOrderUpdates((prev) => [...prev, update]);
    });

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, orderUpdates }}>
      {children}
    </SocketContext.Provider>
  );
};