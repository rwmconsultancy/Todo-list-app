const mongoose = require('mongoose');

const Todoschema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    done: {
        type: Boolean,
        required: false,
        default: false
    }
});

// Creating models
const todoModel = mongoose.model('todo', Todoschema);

module.exports = todoModel;