const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
const { username, password } = req.body;
const hashedPassword = await bcrypt.hash(password, 10);

try {
const user = await User.create({ username, password: hashedPassword });
res.status(201).json({ id: user.id, username: user.username });
} catch (error) {
res.status(400).json({ error: 'User already exists' });
}
});

// Login route
router.post('/login', async (req, res) => {
const { username, password } = req.body;
const user = await User.findOne({ where: { username } });

if (user && await bcrypt.compare(password, user.password)) {
res.status(200).json({ message: 'Login successful', username: user.username });
} else {
res.status(401).json({ error: 'Invalid credentials' });
}
});

// List route
router.get('/list', async (req, res) => {
const users = await User.findAll({ attributes: ['id', 'username'] });
res.status(200).json(users);
});

module.exports = router;
