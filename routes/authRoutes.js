// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');


router.post('/login', AuthController.login);
router.get('/me', authenticate, AuthController.getCurrentUser);


module.exports = router;
