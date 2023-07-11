const express = require('express');
const app = express();
const cors = require("cors");
const url = 'mongodb://localhost:27017'
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const dbName = 'scores_db';
const db = client.db(dbName);

app.use(cors())
app.use(express.json());

MongoClient.connect(url, function (err, client) {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        return;
    }

});