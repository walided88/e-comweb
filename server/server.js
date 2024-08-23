const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const setupSocket = require('./socket'); // Importer la configuration de socket.io

const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();

// Configurer CORS pour permettre toutes les origines nécessaires
const corsOptions = {
    origin: [
        'https://ecom-chi-nine.vercel.app' // Production
    ],
    methods: ['GET', 'POST'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const server = http.createServer(app); // Créer le serveur HTTP

setupSocket(server); // Configurer socket.io avec le serveur

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));

// Définition des routes
app.use('/users', userRoutes);
app.use('/clients', clientRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // Utiliser 'server.listen' et non 'app.listen'
