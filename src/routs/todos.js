const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todos');

// Rotas sem parâmetros ou corpo
router.get('/todos', todoController.getAll);

// Rotas que usam somente 'req.param'
router.get('/todos/:id', todoController.getTodo);
router.get('/todos/top/:count', todoController.getTopTodos);
router.delete('/todos/:id/:userId', todoController.deleteTodo);

// Rotas com 'req.body'
router.post('/todos/', todoController.createTodo);
    // {
    //     name: String,
    //     priority: int
    // }

router.put('/todos/', todoController.updateTodo);
    // {
    //     id: int,
    //     name: String,
    //     priority: int
    // }

// SQL INJECTION
router.put('/injection/', todoController.injection);
    // {
    //     id: int,
    //     name: String,
    //     priority: int
    // }

module.exports = router;