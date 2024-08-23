const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const io = socketIo(server, {
    cors: {
        origin: "https://ecom-chi-nine.vercel.app",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Middleware pour gérer le token JWT
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

// Gestion des connexions
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

// Démarrer le serveur
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
