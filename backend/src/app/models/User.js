const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    displayName: { type: String },
    email: { type: String },
    photoURL: { type: String },
});

module.exports = mongoose.model('User', User);