const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = jwt.sign({ _id: user._id.toString(), role: user.role }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get user profile
router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;