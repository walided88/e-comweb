const mongoose = require('mongoose');

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
    commandes: [{
        prods: [mongoose.Schema.Types.Mixed],
        selled: { type: Boolean, default: false },
        // date: { type: Date, default: Date.now }
        date: { type: Date, default: Date.now }
    }]
});


const client = mongoose.model('Client', clientSchema);

module.exports = client;
