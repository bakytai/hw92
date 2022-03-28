const rootPath = __dirname;

module.exports = {
    rootPath,
    mongo: {
        db: 'mongodb://localhost/chat-app',
        options: {useNewUrlParser: true},
    }
};