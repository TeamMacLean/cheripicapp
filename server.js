const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const config = require('./config.json');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


var server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', socket => {
    socket.on('submit', function () {
        var exec = require("child_process").exec;

        exec('cheripic -f assembly.fa -a mutbulk.pileup -b bgbulk.pileup --output=cheripic_output', function (err, stdout, stderr) {
            console.log(stdout);


        });
    });
});


server.listen(config.port, function () {
    console.log('listening on *:' + config.port);
});