import { io } from 'socket.io-client';

export const socketClient = io(process.env.SocketURI as string, {
  autoConnect: false
});

socketClient.connect();
