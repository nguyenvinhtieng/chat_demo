const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatThread = new Schema({
    user1: { type: String, required: true, ref: 'User' },
    user2: { type: String, required: true, ref: 'User' },
    lastMessage: { type: String, required: true },
    lastMessageTime: { type: Date, default: Date.now },
    isRead: {type: Boolean, default: false}
});

module.exports = mongoose.model('ChatThread', ChatThread);