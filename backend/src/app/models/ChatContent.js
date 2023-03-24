const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatContent = new Schema({
    sender: { type: String, required: true, ref: 'User' },
    receiver: { type: String, required: true, ref: 'User' },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ChatContent', ChatContent);