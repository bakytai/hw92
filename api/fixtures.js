const mongoose = require('mongoose');
const config = require('./config');
const Message = require("./models/Message");
const User = require("./models/User");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [sara, alina] = await User.create({
        email: 'saikal@gmail.com',
        password: '000',
        displayName: 'sara',
        token: '5enDI2paOqusPavVWOnwB'
    }, {
        email: 'alina@mail.ru',
        password: '000',
        displayName: 'alina',
        token: '8enDI2paOqusBavVWOnwL'
    }, {
        email: 'test@mail.ru',
        password: '000',
        displayName: 'test',
        token: '667'
    });

    await Message.create({
        user: sara,
        message: 'my name is Sara'
    }, {
        user: sara,
        message: 'how do you feel?'
    }, {
        user: alina,
        message: 'my name is Alina'
    }, {
        user: alina,
        message: 'how are you'
    });

    await mongoose.connection.close();
};


run().catch(e => console.log(e));
