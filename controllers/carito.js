const carritoRouter = require('express').Router();
const Articulo = require('../models/articulo');
const User = require('../models/user');


carritoRouter.get('/', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401)
    }

    await user.populate('articulo');

    response.status(200).json(user.todos);
});

carritoRouter.post('/', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401)
    }

    const { img, name,precio, cantidad } = request.body;

    const todo = new Articulo({
        img,
        name,
        precio,
        cantidad,
        user: user._id
    });

    const savedTodo = await todo.save();

    user.todos = user.articulo.concat(savedArticulo._id);
    await user.save();

    response.status(201).json(savedArticulo);

});

carritoRouter.patch('/:id', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401)
    }

    const { id } = request.params;
    const { checked } = request.body;
    await Todo.findByIdAndUpdate(id, { checked });

    response.sendStatus(200);

});

carritoRouter.delete('/:id', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401)
    }
    const { id } = request.params;
    await Todo.findByIdAndDelete(id);
    user.todos = user.todos.filter(todo => todo.toString() !== id)
    await user.save();
    response.sendStatus(204);

});



module.exports = carritoRouter