// Import necessary modules
const socketio = require('socket.io');
const Chat = require('../models/chat');

// Function to initialize WebSocket server
function chatSocket(server) {
    const io = socketio(server);

    // Middleware to authenticate and authorize users
    io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      // Implement your token verification logic here
          // Verify token (you need to implement this function)
    verifyToken(token)
    .then((user) => {
      // Attach user information to the socket
      socket.user = user;
      next();
    })
      next();
    });
  
    // Event handler when a client connects
    io.on('connection', (socket) => {
      console.log('A user connected:', socket.user.username);
  
      // Event handler when a new chat message is received
      socket.on('chatMessage', async (data) => {
        try {
          // Create a new chat message
          const chatMessage = new ChatMessage({
            grievanceId: data.grievanceId,
            sender: socket.user.id,
            message: data.message
          });
  
          // Save the chat message to the database
          await chatMessage.save();
  
          // Broadcast the chat message to all users in the same grievance
          io.to(data.grievanceId).emit('newChatMessage', chatMessage);
        } catch (error) {
          console.error('Error saving chat message:', error);
        }
      });
  
      // Event handler when a user joins a grievance chat room
      socket.on('joinGrievanceChat', (grievanceId) => {
        // Join the room corresponding to the grievance
        socket.join(grievanceId);
      });
  
      // Event handler when a client disconnects
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.user.username);
      });
    });
  
    return io;
  
}

module.exports = chatSocket;
