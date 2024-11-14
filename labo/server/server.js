// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();

app.use(cors()); // Activer CORS pour toutes les routes
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));

// Définition des routes
app.use('/users', userRoutes);
app.use('/clients', clientRoutes);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // Utiliser 'server.listen' et non 'app.listen'
