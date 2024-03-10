import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;

const useSocket = (serverUrl: string) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Connect to the server
    socket = io(serverUrl);

    // Set the connected state when the connection is established
    socket.on("connect", () => {
      setConnected(true);
    });

    // Set the connected state to false when the connection is lost
    socket.on("disconnect", () => {
      setConnected(false);
    });
  }, []);

  return socket;
};

export default useSocket;
