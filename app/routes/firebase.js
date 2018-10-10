const fetch = require('node-fetch');
const http = require('https');

var fs = require('fs');

var express = require('express');
var router = express.Router();

var elasticsearch = require('elasticsearch');
var client = elasticsearch.Client({
  host: 'localhost:9200'
});

/* GET reports track listing. */
router.get('/', function(req, res, next) {
    res.send('{id:xyz}');
});

router.get('/status', (req, res) => {
    res.render('index', { title: 'OK' });
});

router.get('/lista', (req, res) => {

  const options = {
        method: 'GET',
        timeout: 800,
        compress: true,
        headers: { 
            'Accept-Encoding': 'gzip,deflate'
        }
  }; 

  fetch('https://lym-iot.firebaseio.com/rest/iot-data/education/users.json?print=pretty', options)
    .then(res => res.text())
    .then(body => {
    res.send(body);
  }).catch((error) => {
    res.send(error);
    //logger.error(error.message, error);
    //res.status(error.response.status).send(error.response.data);
  });
});

var firebase = require("firebase");

var config = {
  apiKey: "apiKey",
  authDomain: "projectId.firebaseapp.com",
  databaseURL: "https://lym-iot.firebaseio.com",
  storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

var database = firebase.database();

router.post('/add-user', (req, res) => {
    var nome = 'Leo';
    nome = req.body.nome;
    var cidade = 'SP';
    cidade = req.body.cidade;
    writeUserData(nome, "Leonardo", "leoym@bol.com.br", "imageUrl");
    res.send(nome + ' - '  + cidade);
});

router.post('/add-post', (req, res) => {
    writeNewPost('iuid', 'leoym', 'picture', 'title' , 'body');
    res.render('index', { title: 'Post adicionado com sucesso.' });
});

router.get('/add', (req, res) => {
    writeUserData("leoym", "Leonardo", "leoym@bol.com.br", "imageUrl");
    writeNewPost('iuid', 'leoym', 'picture', 'title' , 'body');
    res.render('index', { title: 'Usuário e post adicionado com sucesso.' });
});

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

function writeNewPost(uid, username, picture, title, body) {
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  var newPostKey = firebase.database().ref().child('posts').push().key;

  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

module.exports = router;
