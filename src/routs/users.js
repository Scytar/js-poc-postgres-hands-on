const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

// Rotas sem parâmetros ou corpo
router.get('/users', userController.getAll);


module.exports = router;