// chatSocket.js

const socketIo = require('socket.io');

// Initialize Socket.IO
function initializeSocket(server) {
    const io = socketIo(server);
    //console.log(io)
    io.on('connection', (socket) => {
        console.log('New client connected');

        // Join a room based on grievanceId
        socket.on('join room', (grievanceId) => {
            socket.join(grievanceId);
            console.log(`Client joined room: ${grievanceId}`);
        });

        // Handle chat messages for a specific grievanceId
        socket.on('chat message', (data) => {
            const { grievanceId, message } = data;
            // Broadcast the message to all clients in the room
            io.to(grievanceId).emit('chat message', message);
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
}

module.exports = initializeSocket;
