const User = require('../models/user');
const jwt = require('jsonwebtoken');


const authExtractor = async (request, response, next) => {
    const authorization = request.headers.cookie;

    if (!authorization) {
        return response.sendStatus(401);
    }

    const token = authorization.split('=')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    const user = await User.findById(decodedToken.id)
    request.user = user;

    return next();
}

module.exports = authExtractor;
