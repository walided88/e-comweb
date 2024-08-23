const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const setupSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "http://localhost:3000", // Change this to your frontend URL
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (token) {
            jwt.verify(token, jwtSecret, (err, decoded) => {
                if (err) {
                    return next(new Error("Authentication error"));
                }
                socket.user = decoded;
                next();
            });
        } else {
            next(new Error("Authentication error"));
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.user);

        socket.on('message', (message) => {
            const fullMessage = {
                ...message,
                mail: socket.user.mail,
                name: socket.user.name,
                createdAt: new Date().toISOString()
            };
            io.emit('message', fullMessage);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

module.exports = setupSocket;
