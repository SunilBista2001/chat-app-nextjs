import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const PORT = process.env.SOCKET_PORT || 3001;

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} a user connected`);
  io.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
