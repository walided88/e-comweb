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

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
