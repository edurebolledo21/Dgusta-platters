const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    text: String,
    checked: Boolean,
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

todoSchema.set('toJSON', {
    transform: (document, returnedObjet) => {
        returnedObjet.id = returnedObjet._id.toString()
        delete returnedObjet._id
        delete returnedObjet.__v
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;