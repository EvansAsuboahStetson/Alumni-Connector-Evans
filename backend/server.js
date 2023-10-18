const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!\n");
});

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

const rooms = {};

io.on("connection", (socket) => {
  console.log("New client connected");

  // When a user connects, send them the list of previous messages in the same room


  // When a user sends a message, add it to the messages array and broadcast it to all users in the same room
  socket.on("message", (msg) => {
    try {
     
      if (!rooms[msg.roomId]) {
        rooms[msg.roomId] = [];
      }
      rooms[msg.roomId].push(msg);
      console.log(`New message in room ${msg.roomId}: `, msg);
      io.to(msg.roomId).emit("message", msg);
      console.log(rooms,"Rooms created")
    } catch (error) {
      console.error(`Error sending message in room ${msg.roomId}: `, error);
      socket.emit("messageError", "Error sending message.");
    }
  });

  // Listen for events to join or create a room
  socket.on("joinRoom", (roomId) => {
    try {
      socket.join(roomId);
      console.log(`Client joined room ${roomId}.`);
    } catch (error) {
      console.error(`Error joining room ${roomId}: `, error);
      socket.emit("joinRoomError", "Error joining room.");
    }
  });

  socket.on("createRoom", (roomId) => {
    try {
      socket.join(roomId);
      console.log(`Client created and joined room ${roomId}.`);
    } catch (error) {
      console.error(`Error creating and joining room ${roomId}: `, error);
      socket.emit("createRoomError", "Error creating and joining room.");
    }
  });
  socket.on("previousMessages", (roomId) => {
    try {
      console.log(rooms)
      const roomMessages = rooms[roomId] || [];
      console.log(`Previous messages for room ${roomId}: `, roomMessages);
      socket.emit("previousMessages", roomMessages);
    } catch (error) {
      console.error(`Error getting previous messages for room ${roomId}: `, error);
      socket.emit("previousMessagesError", "Error getting previous messages.");
    }
  });

  // When a user disconnects, log it in the server console
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
  
  console.log("Server listening on port 5000");
});
