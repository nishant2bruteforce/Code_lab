const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

function generateRandomFiveLetterName() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.username = generateRandomFiveLetterName();

  console.log(
    `A user connected with ID: ${socket.id} (Name: ${socket.username})`
  );

  io.emit("system message", `${socket.username} has joined the chat.`);

  socket.on("chat message", (msg) => {
    console.log(`Message from ${socket.username}: ${msg}`);

    const messageData = {
      username: socket.username,
      message: msg,
    };
    io.emit("chat message", messageData);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.username} disconnected`);
    if (socket.username) {
      io.emit("system message", `${socket.username} has left the chat.`);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});
