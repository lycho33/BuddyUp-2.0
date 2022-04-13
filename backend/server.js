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
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    }
});

server.listen(8080, (socket) => {
  console.log('listening on *:8080');
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    
    //receive room_data from the client
    socket.on("join_room", (data) => {
      socket.join(data)
      console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    //receive message_data from the client
    socket.on("send_message", data => {
      //send a message to the client, broadcasted from data.room
      socket.to(data.room).emit('receive_message', data)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
    });
});


