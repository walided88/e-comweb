/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// Secret key for JWT
// const JWT_SECRET = 'xxxx'; // Replace with a strong secret key
router.post('/submit', async (req, res) => {
    try {
        const { name, email, num, adresse, prods,ville } = req.body;

        // Check if the client already exists
        let client = await Client.findOne({ email });
        if (client) {
            // Add new order to existing client
            client.commandes.push({ prods });
            await client.save();

            return res.status(201).json({ message: 'New order added to existing client', client });
        }

        // Create a new client with the first order
        client = new Client({ name,ville, email, num, adresse, commandes: [{ prods }] });
        await client.save();

        res.status(201).json({ message: 'Client created successfully', client });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/sendMessage', async (req, res) => {
    try {
        const { messages,clientId } = req.body;

        // Check if the client already exists
        let user = await User.findOne({ clientId });
        if (user) {
            // Add new order to existing client
            user.messages.details.push({ messages });
            await user.save();

            return res.status(201).json({ messages: 'New order added to existing client', client });
        }

        res.status(201).json({ message: 'Client created successfully', client });
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

router.put('/:clientId/:commandeId/:prodId', async (req, res) => {
    try {
        const client = await Client.findById(req.params.clientId);
        
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Trouver la commande avec l'ID spécifié
        const commande = client.commandes.id(req.params.commandeId);
        if (!commande) {
            return res.status(404).json({ message: 'Commande not found' });
        }

        // Trouver le produit avec l'ID spécifié dans la commande
        const prod = commande.prods.find(prod => prod.id === req.params.prodId);
        if (!prod) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Mettre à jour la propriété 'selled'
        prod.selled = true;

        // Sauvegarder les changements dans le client
        await client.save();
        res.status(200).json(client);
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
