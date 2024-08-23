const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const setupSocket = require('./socket');

const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();

// Configuration CORS
app.use(cors({
    origin: 'https://ecom-chi-nine.vercel.app', // L'URL de ton site en production
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

const server = http.createServer(app);

setupSocket(server);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));

app.use('/users', userRoutes);
app.use('/clients', clientRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
