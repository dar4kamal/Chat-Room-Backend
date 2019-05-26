const express = require("express");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Chat Room ....");
});

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected ...");
  socket.on("Talk", data => {
    io.sockets.emit("Talk", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`server is ready at port ${port} ...`);
});
