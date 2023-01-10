const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    passwordHash: String,
    Articulos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Articulos'
        }
    ]
});

userSchema.set('toJSON', {
    transform: (document, returnedObjet) => {
        returnedObjet.id = returnedObjet._id.toString()
        delete returnedObjet._id
        delete returnedObjet.passwordHash
        delete returnedObjet.__v
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;