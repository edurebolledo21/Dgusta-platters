const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
        return response.status(400).json({
            error: 'correo o contraseña invalidos'
        })
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

    if (!passwordCorrect) {
        return response.status(400).json({ error: 'correo o contraseña invalidos' })
    }

    const userForToken = {
        id: user._id,
        email: user.email
    }

    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '1d'
    });

    response.cookie('accessToken', accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    });

    response.status(200).json({
        accessToken,
        userId: user._id,
        email: user.email,
    });
});

module.exports = loginRouter;


