const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require('../models/user')
const config = require("../config/config");

exports.registration = async (req, res) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: password,
    });

      try {
        const newUser = await user.save()
        res.status(201).json(newUser)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }   

}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) return res.status(400).send("Email or Password is wrong");
            const token = jwt.sign({id: user.id}, config.TOKEN_SECRET);
            res.header("auth-token", token).send({"token": token});
        } else {
            res.status(401).send('Invalid email or password');
        }
    }
    catch (err) {
        res.status(500).send("Error retrieving User");
    }  
};

exports.authuseronly = (req, res) => {
    res.send("Hey,You are authenticated user. So you are authorized to access here.");
};