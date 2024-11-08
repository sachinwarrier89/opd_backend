// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const config = require('../config');

const AuthController = {
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await UserModel.findByUsername(username);
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  getCurrentUser: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        console.log('User not found', user);
        return res.status(404).json({ message: 'User not found' });
      }
      const { password, ...userData } = user; // Exclude password
      res.json(userData);
    } catch (error) {
      console.error('Error fetching user info:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  //not currently used
  register: async (req, res) => {
    const {
      username,
      password,
      name,
      timings,
      address,
      meta,
    } = req.body;

    let logo = null;
    if (req.file) {
      logo = `/uploads/logos/${req.file.filename}`;
    }

    try {
      // Check if username is taken
      const existingUser = await UserModel.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const userData = {
        username,
        hashedPassword,
        name,
        timings,
        address,
        meta,
        logo,
      };
      const userId = await UserModel.create(userData);

      // Generate JWT token
      const token = jwt.sign({ id: userId }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });

      res.json({ token });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

};

module.exports = AuthController;
