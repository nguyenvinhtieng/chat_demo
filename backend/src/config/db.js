const mongoose = require('mongoose');

const connectionString = process.env.CONNECTTION_STRING || 'mongodb+srv://vinhtieng:vinhtieng@webchatapp.4ntrm.mongodb.net/chatappzalo';
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