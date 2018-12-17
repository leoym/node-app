require('systemd');
 
var express = require('express');
var app = express();

app.use(express.static('public'));

app.set('views','views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/health', function (req, res) {
  res.send('Status UP');
});

app.get('/teste', function (req, res) {
  res.send('Teste UP');
});

app.get('/info', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.listen('systemd');

