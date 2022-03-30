const {nanoid} = require('nanoid');
const User = require('../models/User');
const Message = require('../models/Message');

const activeConnections = {};

module.exports= (ws, req) => {
    const id = nanoid();
    console.log('client connected! id=', id);
    activeConnections[id] = ws;
    let userOnline = null;
    let usersArr = [];

    ws.on('message', async (msg) => {
        const decodedMessage = JSON.parse(msg);
        switch (decodedMessage.type) {
            case 'LOGIN':
                userOnline = await User.findOne({token: decodedMessage.token});
                usersArr.push(userOnline);
                const messagesArr = await Message.find().populate('user', '_id email displayName token').limit(30);

                Object.keys(activeConnections).forEach(id => {
                    const conn = activeConnections[id];

                    conn.send(JSON.stringify({
                        type: 'All_MESSAGE',
                        message: {
                            messages: messagesArr,
                            users: usersArr
                        }
                    }))
                })
                break;

            case 'LOGOUT':
                userOnline = await User.findOne({token: decodedMessage.token});
                usersArr.splice(usersArr.indexOf(userOnline), 1);

                Object.keys(activeConnections).forEach(connId => {
                    const conn = activeConnections[connId];
                    conn.send(JSON.stringify({
                        type: 'USER_LOGOUT',
                        messages: {
                            users: usersArr
                        }
                    }));
                });
                userOnline = null;

                break;
            case 'SEND_MESSAGE':
                if (userOnline === null) break;
                userOnline = await User.findOne({token: decodedMessage.token});
                await Message.create({
                    user: userOnline,
                    text: decodedMessage.text
                });
                const newMessage = await Message.find().populate('user', '_id email displayName token').limit(30);
                Object.keys(activeConnections).forEach(id => {
                    const conn = activeConnections[id];
                    conn.send(JSON.stringify({
                        type: 'NEW_MESSAGE',
                        message: {
                            messages: newMessage
                        }
                    }))
                });
                break;
            default:
                console.log('Unknown message type:', decodedMessage.type);
        }
    })

    ws.on('close', () => {
        console.log('client disconnected! id=', id);
        delete activeConnections[id]
    });
}

