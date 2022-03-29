const {nanoid} = require('nanoid');
const User = require('../models/User');
const Message = require('../models/User');

const activeConnections = {};
let user = null;
users = [];

module.exports= (ws, req) => {
    const id = nanoid();
    console.log('client connected! id=', id);
    activeConnections[id] = ws;

    ws.on('message', async (msg) => {
        const decodedMessage = JSON.parse(msg);
        switch (decodedMessage.type) {
            case 'LOGIN':
                user = await User.findOne({token: decodedMessage.token});
                users.push(user);
                const messages = await Message.find().populate("user", "displayName");
                Object.keys(activeConnections).forEach(id => {
                    const conn = activeConnections[id];
                    conn.send(JSON.stringify({
                        type: 'All_USERS',
                        message: users
                    }))
                })
                Object.keys(activeConnections).forEach(id => {
                    const conn = activeConnections[id];
                    conn.send(JSON.stringify({
                        type: 'All_MESSAGE',
                        message: messages
                    }))
                })
                break;

            case 'LOGOUT':
                user = await User.findOne({token: decodedMessage.token});
                users.forEach(deleteUser => {
                    if (user.token === deleteUser.token) {
                        const id = users.indexOf(deleteUser);
                        users.splice(id, 1);
                    }
                })
                break;
            case 'SEND_MESSAGE':
                if (user === null) break;
                user = await User.findOne({token: decodedMessage.token});
                Object.keys(activeConnections).forEach(id => {
                    const conn = activeConnections[id];
                    conn.send(JSON.stringify({
                        type: 'NEW_MESSAGE',
                        message: {
                            user: user.displayName,
                            message: decodedMessage.text
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

