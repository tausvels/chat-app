const express = require('express');
const socket = require('socket.io'); // The web socket library

const app = express();

app.use(express.static("public"));

const server = app.listen(8000, () => console.log('Listening on port 8000!'))

//Setting up the web socket in the server side
const io = socket(server);

io.on("connection", (socket) => {
  console.log(`Websocket connected.`)

  // HANDLE CHAT EVENT
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data)
  });

  // HANDLE CLIENT TYPING...
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  })
}) 