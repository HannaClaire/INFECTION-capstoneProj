const express = require('express');
const app = express();

const cors = require("cors");
const url = 'mongodb://localhost:27017'

app.use(cors())

app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const dbName = 'scores_db'; 

MongoClient.connect(url, function (err, client) {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        return;
    }

    const db = client.db(dbName);

});