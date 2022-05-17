// imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConfig = require('./app/database/dbConfig');

const router = require('./routes/api.js');

const app = express();
const port = process.env.PORT || 3100;


// middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api', router);


const server = require('http').createServer(app);

// socket

// server
server.listen(port, () => {
    console.log(`server is running on http://127.0.0.1:${port}`)
})