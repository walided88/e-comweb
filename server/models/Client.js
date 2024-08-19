const mongoose = require('mongoose');

// Définition du sous-schéma pour 'prods'
const prodSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    price: { type: Number },
    image: { type: String },
    quantity: { type: Number },
    selled: { type: Boolean, default: false }
});
const messageSchema = new mongoose.Schema({
    selfMessage: { type: String },
    idReceiver: { type: Number },
    date: { type: Date, default: Date.now }

});

// Schéma principal pour 'Client'
const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    num: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    ville: {
        type: String,
        required: true
    },
    conversation: {
        messages: [messageSchema],  // Utilisation du sous-schéma pour 'prods'
    },
    commandes: [{
        prods: [prodSchema],  // Utilisation du sous-schéma pour 'prods'
        selled: { type: Boolean, default: false },
        date: { type: Date, default: Date.now }
    }]
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
