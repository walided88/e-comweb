const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');

const setupSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (token) {
            jwt.verify(token, 'xxxx', (err, decoded) => { // Replace 'your_secret_key' with your actual JWT secret
                if (err) {
                    return next(new Error("Authentication error"));
                }
                // Attach user information to socket
                socket.user = decoded; // You can also store other user information if needed
                next();
            });
        } else {
            next(new Error("Authentication error"));
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.user); // Now socket.user should have the decoded token data

        socket.on('message', (message) => {
            io.emit('message', message);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

module.exports = setupSocket;
