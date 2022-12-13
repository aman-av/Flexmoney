const express = require('express')
const app = express()
var session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const keys = require('./config/keys');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require('body-parser');
async function main() {
    try {
        //Mongostore for storing sessions in mongodb
        const store = await new MongoDBStore({
                uri: keys.mongoURI,
                databaseName:'sessions',
                collection: 'allsessions'
            }
        ) 
        
        //for connecting mongodb to store data
        // client = new MongoClient(keys.mongoURI);
        // await client.connect();

        mongoose.set('strictQuery', false);
        await mongoose.connect(keys.mongoURI,
        {
            useUnifiedTopology:true,
            useNewUrlParser:true
            });
        
        app.use(session({
            secret: keys.sessionSecret,
            resave: false,
            secure: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 60 * 60 * 1000,
            },
            store: store
        }));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json())
        app.use(cors({
        "origin": "http://localhost:3000",
        "optionsSuccessStatus": 200
    }));
        app.use('/', require('./routes/routes'));


    }
    catch (e) {
        console.error(e);
    }
}

try {
    main();
}   
catch (err)
{
    console.log(err);
}

const PORT= process.env.PORT || 4000;
app.listen(PORT, function() {
    console.log('Our app is running on http://localhost:' + PORT);
});