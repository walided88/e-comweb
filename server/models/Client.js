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
 
    prods: {
        type: [mongoose.Schema.Types.Mixed],        
        required: true
    }
});


const client = mongoose.model('Client', clientSchema);

module.exports = client;
