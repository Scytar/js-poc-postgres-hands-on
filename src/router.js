const express = require('express');
const router = express.Router();
const todoRouts = require('./routs/todos')
const userRouts = require('./routs/users')

router.use(todoRouts);
router.use(userRouts);

module.exports = router;