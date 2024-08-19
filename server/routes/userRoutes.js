/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = 'xxxx'; // Replace with a strong secret key

// Sign Up Route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, age } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const user = new User({ name, email, password, age });
        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
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


// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route pour obtenir tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour obtenir un utilisateur par ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour mettre à jour un utilisateur par ID
router.put('/:id', async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        user.age = age || user.age;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour supprimer un utilisateur par ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get browsing history
router.get('/user/:id/browsing-history', async (req, res) => {
    try {
        // eslint-disable-next-line no-undef
        const browsingHistory = await BrowsingHistory.find({ userId: req.params.id });
        res.status(200).json(browsingHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get shopping cart contents
router.get('/user/:id/cart', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get purchase history
router.get('/user/:id/purchase-history', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get product reviews by user
router.get('/user/:id/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.id });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Get wishlist
router.get('/user/:id/wishlist', async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.params.id });
        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get email interaction history
router.get('/user/:id/email-interactions', async (req, res) => {
    try {
        const emails = await EmailInteraction.find({ userId: req.params.id });
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get social media login info
router.get('/user/:id/social-logins', async (req, res) => {
    try {
        const logins = await SocialLogin.find({ userId: req.params.id });
        res.status(200).json(logins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get device and location data
router.get('/user/:id/device-location', async (req, res) => {
    try {
        const deviceLocation = await DeviceLocation.findOne({ userId: req.params.id });
        res.status(200).json(deviceLocation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get session data
router.get('/user/:id/sessions', async (req, res) => {
    try {
        const sessions = await Session.find({ userId: req.params.id });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get loyalty points
router.get('/user/:id/loyalty-points', async (req, res) => {
    try {
        const points = await LoyaltyPoints.findOne({ userId: req.params.id });
        res.status(200).json(points);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get login attempts
router.get('/user/:id/login-attempts', async (req, res) => {
    try {
        const attempts = await LoginAttempt.find({ userId: req.params.id });
        res.status(200).json(attempts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});









module.exports = router;














