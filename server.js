const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const PORT = process.env.SOCKET_PORT || 3001;

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    withCredentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send_msg", (data) => {
    console.log("messageResponse", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
