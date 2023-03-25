const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
}); 

const route = require('./route/index.js');
const db = require('./config/db.js');
const mySocket = require('./socket/index.js');
db.connect();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
route(app)
server.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})
mySocket(io);