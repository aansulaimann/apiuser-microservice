const express = require('express');
const router = express.Router();

const userHandler = require('./handler/users')

// POST regist Users
router.post('/register', userHandler.register)

// POST login Users
router.post('/login', userHandler.login)

// POST login Users
router.post('/logout', userHandler.logout)

// PUT Update Users
router.put('/:id', userHandler.update)

// GET User
router.get('/:id', userHandler.getUser)

// GET ALL Users
router.get('/', userHandler.getUsers)

module.exports = router;
