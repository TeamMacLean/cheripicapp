const app = require('./app');
const config = require('./config.json');

const server = require('http').Server(app);


server.listen(config.port, function () {
    console.log('listening on *:' + config.port);
});