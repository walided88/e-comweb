// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const setupSocket = require('./socket'); // Importer la configuration de socket.io

const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();
app.use(cors({
    origin: ["https://ecom-chi-nine.vercel.app","http://localhost:3000","https://e-com-cb4u.onrender.com"], // Remplacez par l'origine de votre frontend

    methods: ["GET", "POST","PUT"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(cors()); // Activer CORS pour toutes les routes
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
server.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`));
