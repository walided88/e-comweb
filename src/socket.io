const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
import { Server as socketIo } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (message) => {
        io.emit('message', message); // Diffuse le message à tous les utilisateurs connectés
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => console.log('Server is running on port 3000'));
