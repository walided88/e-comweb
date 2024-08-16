/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'xxxx'; // Replace with a strong secret key



// Sign Up Route
router.post('/submit', async (req, res) => {
    try {
        const { name, email, num, adresse,prods } = req.body;

        // Check if the client already exists
        const existingUser = await Client.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Client already exists' });
        }

        // Create a new client
        const client = new Client({ name, email, num, adresse,prods });
        await client.save();

        res.status(201).json({ message: 'client created successfully', client });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route pour obtenir tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour obtenir un utilisateur par ID
router.get('/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'client not found' });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour mettre à jour un utilisateur par ID
router.put('/:id', async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const client = await Client.findById(req.params.id);
        
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        client.name = name || client.name;
        client.email = email || client.email;
        client.password = password || client.password;
        client.age = age || client.age;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour supprimer un utilisateur par ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await Client.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Client not found' });
        }

        await user.remove();
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
