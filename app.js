const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config.json');
const Jobs = require('./controllers/jobs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('cookie-parser')());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('multer')({
    dest: config.tmpDir
}));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/job/:id', Jobs.show);
app.get('/job/:id/download', Jobs.download);

app.post('/submit', Jobs.submit);

module.exports = app;