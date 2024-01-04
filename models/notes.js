const mongoose = require('mongoose');
const User = require('./user');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sharedWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

noteSchema.index({ content: 'text', title: 'text' });


const Note = mongoose.model('Notes', noteSchema);


module.exports = Note;
