const mongoose = require('mongoose');

const connectionString = process.env.CONNECTTION_STRING || 'mongodb://localhost:27017/chat_app';
async function connect() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully')
    } catch (e) {
        console.log('Connect failure: ' + e)
    }
}

module.exports = { connect };