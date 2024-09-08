const Message = require('../models/Message');
const express = require('express');
const router = express.Router();

// GET: Récupère tous les messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Récupère un message par ID
router.get('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Crée un nouveau message
router.post('/', async (req, res) => {
    try {
        const newMessage = new Message({
            messages: req.body.messages || []
        });
        const savedMessage = await newMessage.save();
        res.status(201).json({ message: 'Message created successfully', savedMessage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/', async (req, res) => {
    try {
        console.log('Requête reçue:', req.body);

        // Assurez-vous que "messages" est correctement défini à partir du corps de la requête
        const messages = req.body.reduxMessages || [];

        // Créez un nouveau document Message
        let newMessage = new Message();

        // Ajoutez les messages reçus à la propriété "messages" de newMessage
        newMessage.messages = messages;

        // Sauvegardez le nouveau document dans la base de données
        const savedMessage = await newMessage.save();

        // Retournez une réponse avec succès
        res.status(201).json({ message: 'Message added successfully', savedMessage });
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du message:', error);
        res.status(500).json({ message: error.message });
    }
});



// PUT: Met à jour un message par ID ou ajoute un nouveau message
router.put('/:id', async (req, res) => {
    try {
        const messageToUpdate = await Message.findById(req.params.id);
        if (!messageToUpdate) {
            return res.status(404).json({ message: 'Message not found' });
        }

        messageToUpdate.messages = req.body.messages || messageToUpdate.messages;
        const updatedMessage = await messageToUpdate.save();
        
        res.status(200).json({ message: 'Message updated successfully', updatedMessage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Ajoute un message à une liste de messages existante
router.put('/:messageToSend', async (req, res) => {
    try {
        const messages = req.body;
console.log("messageToSendmessageToSendmessageToSend",messages);
        // Crée une nouvelle instance de Message
        let message = new Message();

        // S'assure que le champ messages est bien un tableau
        message.messages = message.messages || [];

        // Ajoute le nouveau message
        message.messages.push(messageToSend);

        // Sauvegarde l'instance de Message dans la base de données
        await message.save();

        res.status(201).json({ message: 'Message added successfully', message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Supprime un message par ID
router.delete('/:id', async (req, res) => {
    try {
        const messageToDelete = await Message.findById(req.params.id);
        if (!messageToDelete) {
            return res.status(404).json({ message: 'Message not found' });
        }

        await messageToDelete.remove();
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
