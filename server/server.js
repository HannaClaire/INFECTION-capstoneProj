const express = require('express');
const app = express();

const cors = require("cors");

const url = 'mongodb://localhost:27017'
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

// const dbName = 'scores_db';
// const db = client.db(dbName);

app.use(cors())
app.use(express.json());

MongoClient.connect(url )
    .then((client) => {
        const db = client.db("scores_db")
        const usersCollection = db.collection("users")
        const usersRouter = createRouter(usersCollection);
        app.use("/api/scores_db", usersRouter)
    })
    .catch(console.err)
    app.listen(9000, function (){
        console.log(`Listening on port ${ this.address().port}`)
    })
