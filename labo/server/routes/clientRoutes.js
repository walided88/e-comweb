/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const Client = require('../models/Client');


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
    const { clientId, commandeId, prodId } = req.params;

    console.log('Client ID:', clientId);
    console.log('Commande ID:', commandeId);
    console.log('Product ID:', prodId);

    try {
        // Trouver le client
        const client = await Client.findById(clientId);
        if (!client) {
            console.log('Client not found:', clientId);
            return res.status(404).json({ message: 'Client not found' });
        }

        // Trouver la commande
        const commande = client.commandes.id(commandeId);
        if (!commande) {
            console.log('Commande not found:', commandeId);
            return res.status(404).json({ message: 'Commande not found' });
        }

        // Trouver l'index du produit avec id égal à prodId
        const index = commande.prods.findIndex(prod => prod.id === parseInt(prodId, 10));
        if (index === -1) {
            console.log('Product not found with id:', prodId);
            return res.status(404).json({ message: 'Product not found' });
        }

        // Accéder au produit en utilisant l'index
        const prod = commande.prods[index];
        console.log('Product found:', prod);

        // Mettre à jour le produit
        prod.selled = true;

        // Sauvegarder les changements
        await client.save();
        res.status(200).json(client);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
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
