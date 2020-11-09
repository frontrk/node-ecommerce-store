const express = require('express')
const router = express.Router()
const userController = require('../controllers/user');
const jwt = require("jsonwebtoken");
const config = require('../config/config')

const loggedIn = function (req, res, next) {
    if (!req.headers.authorization) { 
        return res.status(401).send({ 
            error: 'Token is missing' 
        }); 
    } 
    const BEARER = 'Bearer' 
    const AUTHORIZATION_TOKEN = req.headers.authorization.split(' ') 
    if (AUTHORIZATION_TOKEN[0] !== BEARER) { 
        return res.status(401).send({ 
            error: "Token is not complete" 
        }) 
    } 
    jwt.verify(AUTHORIZATION_TOKEN[1], config.TOKEN_SECRET, function(err) { 
        if (err) { 
            return res.status(401).send({ 
                error: "Token is invalid" 
            }); 
        } 
        next(); 
    }); 
}

router.post('/register', userController.registration);
router.post('/login', userController.login);
router.get('/authuseronly', loggedIn, userController.authuseronly);

// // Admin user only
// router.get('/adminonly', loggedIn, adminOnly, userController.adminonly);

module.exports = router;