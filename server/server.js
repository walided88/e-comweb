const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://ecom-chi-nine.vercel.app",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const jwtSecret = process.env.JWT_SECRET || 'default_secret'; // Utiliser une clé secrète sécurisée en production

// Importer les routes
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');

// Configurer CORS pour Express
app.use(cors({
    origin: ["https://ecom-chi-nine.vercel.app", "http://localhost:3000"], // Ajoutez toutes les origines nécessaires ici
    methods: ["GET", "POST"],
    credentials: true
}));


app.use(express.json()); // Middleware pour parser le JSON

app.use('/users', userRoutes);
app.use('/clients', clientRoutes);

// Middleware pour gérer le token JWT avec Socket.io
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

const setupSocket = require('./socket'); // Importer la configuration de socket.io
setupSocket(server);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
