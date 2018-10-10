/**
 * Module dependencies.
 */

//var express = require('../..');
var express = require('express');
var hash = require('pbkdf2-password')()
var path = require('path');
var session = require('express-session');

var app = module.exports = express();

// config

app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));

// middleware

app.use(express.urlencoded({ extended: false }))
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));

// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

// dummy database

var users = {
  tj: { name: 'tj' }
};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)

hash({ password: 'foobar' }, function (err, pass, salt, hash) {
  if (err) throw err;
  // store the salt & hash in the "db"
  users.tj.salt = salt;
  users.tj.hash = hash;
});


// Authenticate using our plain-object database of doom!

function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  var user = users[name];
  // query the db for the given username
  if (!user) return fn(new Error('cannot find user'));
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user)
    fn(new Error('invalid password'));
  });
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/sec/login');
  }
}

app.get('/', function(req, res){
  res.redirect('/sec/login');
});

app.get('/restricted', restrict, function(req, res){
  res.render('body', {title: "User", message: "Wahoo! restricted area."});
  //res.send('Wahoo! restricted area, click to <a href="/sec/logout">logout</a>');
});

app.get('/user', restrict, function(req, res){
  res.render('body', {title: "User", message: "Hello"});
});

app.get('/dash', restrict, function(req, res){
  res.render('body1');
});

app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/sec');
  });
});

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', function(req, res){
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/sec/logout">logout</a>. '
          + ' You may now access <a href="/sec/restricted">/sec/restricted</a>.';
        res.redirect('/sec/restricted');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.';
      res.redirect('/sec/login');
    }
  });
});

app.get('/add-user', restrict, function(req, res){
  res.render('sec/add-user', {title:'Add user', message: 'User added'});
});

app.post('/add-user', restrict, function(req, res){
  res.render('sec/add-user', {title:'User Add - ' + req.session.user, message: 'User added: ' + req.body.username + '/'+ req.body.name + ' by: ' + req.session.user});
});
