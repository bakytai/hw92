const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const config = require('./config');
const chat = require('./app/chat');
const users = require('./app/users');
const app = express();

require('express-ws')(app);

const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/users', users);
app.ws('/chat', chat);


const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(e => console.error(e));

