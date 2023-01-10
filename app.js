require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const cookieParser = require('cookie-parser');
const path = require('path');
const authExtractor = require('./middleware/auth');
const logoutRouter = require('./controllers/logout');
const { MONGO_URI } = require('./config');
const carritoRouter = require('./controllers/carito');

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('conecto al servidor');
    } catch (error) {
        console.log('no conecto');
    }

})();

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded())
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/carrito', authExtractor, carritoRouter);
app.use('/', express.static(path.resolve(__dirname, 'views', 'app')))
app.use('/sing-up', express.static(path.resolve(__dirname, 'views', 'sing-up')))
app.use('/login', express.static(path.resolve(__dirname, 'views', 'login')))
app.use('/assemble', express.static(path.resolve(__dirname, 'views', 'assemble')))
app.use('/buy', express.static(path.resolve(__dirname, 'views', 'buy')))

module.exports = app;