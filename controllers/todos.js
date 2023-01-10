const todosRouter = require('express').Router();
const User = require('../models/user');
const Todo = require('../models/todos');

todosRouter.get('/', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401)
    }

    await user.populate('todos');

    response.status(200).json(user.todos);
});

todosRouter.post('/', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401)
    }

    const { text } = request.body;

    const todo = new Todo({
        text,
        checked: false,
        user: user._id
    });

    const savedTodo = await todo.save();

    user.todos = user.todos.concat(savedTodo._id);
    await user.save();

    response.status(201).json(savedTodo);

});

todosRouter.patch('/:id', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401)
    }

    const { id } = request.params;
    const { checked } = request.body;
    await Todo.findByIdAndUpdate(id, { checked });

    response.sendStatus(200);

});

todosRouter.delete('/:id', async (request, response) => {
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



module.exports = todosRouter