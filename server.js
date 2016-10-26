const app = require('./app');
const config = require('./config.json');

var server = require('http').Server(app);
// const io = require('socket.io')(server);
// io.on('connection', socket => {
//     socket.on('submit', function () {
//
//     });
// });


server.listen(config.port, function () {
    console.log('listening on *:' + config.port);
});