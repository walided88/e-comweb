const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the message schema
const messageSchema = new mongoose.Schema({
    selfMessage: { type: String, required: true },  // Make sure messages are not empty
    // idReceiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to another user (if needed)
    // date: { type: Date, default: Date.now }
});

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    conversation: {
        messages: [],  // Embed the messageSchema within the conversation
    },
    age: {
        type: Number
    }
});

// Middleware "pre-save" pour hacher le mot de passe avant de sauvegarder un document utilisateur
userSchema.pre('save', async function (next) {
    // Vérifie si le champ "password" a été modifié
    // Si le mot de passe n'a pas été modifié (par exemple lors d'une mise à jour de profil sans changer le mot de passe), on passe à l'étape suivante
    if (!this.isModified('password')) return next();

    try {
        // Hachage du mot de passe avec bcrypt en utilisant un "salt round" de 10
        // Le "salt round" détermine la complexité du processus de hachage (10 est un bon compromis entre sécurité et performance)
        this.password = await bcrypt.hash(this.password, 10);

        // Passe à l'étape suivante après avoir haché le mot de passe
        next();
    } catch (err) {
        // En cas d'erreur lors du hachage, transmettre l'erreur au middleware suivant
        next(err);
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
