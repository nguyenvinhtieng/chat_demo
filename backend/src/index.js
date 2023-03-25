const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const route = require('./route/index.js');
const db = require('./config/db.js');
db.connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
route(app)
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})