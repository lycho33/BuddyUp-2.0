const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);

app.use(cors())

const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    }
  });

server.listen(8080, (socket) => {
  console.log('listening on *:8080');
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data)
      console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", data => {
      console.log(data)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
    });
});


