const mongoose = require('mongoose');

// Schéma principal pour 'Message'
const messageSchema = new mongoose.Schema({
    messages: []
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
