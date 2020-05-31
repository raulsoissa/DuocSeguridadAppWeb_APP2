const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = require('./verifyToken');

router.post('/signup', async (req, res, next) => {
    const { username, email, password} = req.body;
    const user = new User ({
        username,
        email,
        password
    })
    console.log(user);
    user.password = await user.encryptPassword(user.password);
    await user.save();
    
    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });

    res.json({auth: true, token});
});

router.get('/me', verifyToken, async (req, res, next) => {
    const user = await User.findById(req.userId, { password: 0});
    if (!user) {
        return res.status(404).send('Usuario no encontrado')
    }
    
    res.json(user);
});

router.post('/signin', async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user) {
        return res.status(404).send("el correo no existe");
    }

    const ValidPassword = await user.validatePassword(password);
    if (!ValidPassword) {
        return res.status(401).json({auth: false, message: "la clave no es válida"})
    }

    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });
    
    res.json({auth: true, token});
});

router.get('/users', async (req, res, next) => {
    const users = await User.find();
    res.json(users);
});

router.delete('/users/:id', async (req, res, next) => {
    const users = await User.findByIdAndDelete(res.id);
    res.json(users);
});


module.exports = router;