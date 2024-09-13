// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
// Rota de validação de token
router.get('/validate', authController.validateToken);

module.exports = router;
