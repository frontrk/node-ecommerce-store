const express = require('express')
const router = express.Router()
// const {loggedIn, adminOnly} = require("../helpers/auth.middleware");
const userController = require('../controllers/user');

router.post('/register', userController.registration);

// Login
router.post('/login', userController.login);

// // Auth user only
// router.get('/authuseronly', loggedIn, userController.authuseronly);

// // Admin user only
// router.get('/adminonly', loggedIn, adminOnly, userController.adminonly);

module.exports = router;