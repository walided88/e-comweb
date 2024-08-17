/* eslint-disable no-undef */
// controllers/userController.js
const Client = require('../models/Client');



// Register a new user
const registerClient = async (req, res) => {
    const { name, email, num,adresse } = req.body;
    const clientExists = await Client.findOne({ name });

    if (!clientExists) {
        return res.status(400).json({ message: 'aucun client exists avec ce nom' });
    }

    const client = await Client.create({
        name,
        email,
        num,
        adresse,
        prods,
    });

    if (client) {
        res.status(201).json({
            _id: client._id,
            name: client.name,
            email: client.email,
            num: client.num,
            adresse: client.adresse,
            prods: client.prods,

        });
    } else {
        res.status(400).json({ message: 'Invalid client data' });
    }
};



// Get user profile
const getUserProfile = async (req, res) => {
    const client = await Client.findById(req.user._id);
    if (client) {
        res.json({
            _id: client._id,
            name: client.name,
            email: client.email,
            num: client.num,
            adresse: client.adresse,
            prods: client.prods,
            ville:client.ville,

        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { registerClient, getUserProfile };
