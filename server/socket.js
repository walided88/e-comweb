// server/socket.js
const socketIo = require('socket.io');

const setupSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "http://localhost:3000", // URL de ton client React
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('message', (message) => {
            console.log('Message received:', message); // Assure-toi que le message est bien reçu
            io.emit('message', message); // Diffuse le message à tous les clients
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

module.exports = setupSocket;
