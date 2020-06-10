const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imagePath: { type: String},
    color: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Note', noteSchema);