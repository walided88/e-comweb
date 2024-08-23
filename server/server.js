const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const setupSocket = require('./socket'); // Importer la configuration de socket.io
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const app = express();

const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const server = http.createServer(app);


app.use(cors({
    origin: "https://ecom-chi-nine.vercel.app", // Remplacez par l'origine de votre frontend
    methods: ["GET", "POST"],
    credentials: true
}));

app.use('/users', userRoutes);
app.use('/clients', clientRoutes);
app.use(cors()); // Activer CORS pour toutes les routes
app.use(express.json());


const jwtSecret = process.env.JWT_SECRET || 'default_secret'; // Utiliser une clé secrète sécurisée en production

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


setupSocket(server);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
