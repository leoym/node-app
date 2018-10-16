const fetch = require('node-fetch');

var fs = require('fs');

var express = require('express');
var router = express.Router();

var elasticsearch = require('elasticsearch');
var client = elasticsearch.Client({
  host: 'localhost:9200'
});

/* GET reports track listing. */
router.get('/', function(req, res, next) {
  client.search({
    index: 'reports',
    type: 'track',
    body: {
      query: {
      match_all: {}
      }
    }
  }).then(function(response) {
    var hits = response.hits.hits;
    res.send(response.hits.hits);
  }, function(error) {
  console.trace(error.message);
  });
});

router.get('/abc', function(req, res, next) {
    res.send(GetSite());
});

router.get('/xyz', function(req, res, next) {
    res.send('{id:xyz}');
});

router.get('/add', function(req, res, next) {
  var rn = require('random-number');
  var options = {
    min: 0
    , max: 1000000
    , integer: true
  }

  var rand = rn(options);
  var data = new Date();
  var corp = 'ABC';
  var device = req.query.device;
  var temp = req.query.temp;
  var umid = req.query.umid;
  var sensor = req.query.sensor;
  console.log(device);
  var act  = 'teste 1234';
  var desc = '34324324324';
 
  client.create({
    index: 'reports',
    type: 'track',
    id: String(data.getTime()),
    body: {
      hash: rand,
      corp: corp,
      act: act,
      desc: desc, 
      device: device,
      temp: temp,
      umid: umid,
      sensor: sensor,
      acao: 'log',
      published: true,
      published_at: data ,
      counter: 1
    }
  });

  res.send(String(data.getTime()) + "-"+ rand);
});

const http = require('https');
const https = require('https');

router.get('/teste', (req, res) => {

   const agent = new http.Agent({
        keepAlive: true,
        keepAliveMsecs: 10000000
    });

    const options = {
        //agent,
        method: 'GET',
        timeout: 30,
        compress: true,
        headers: {
            'Accept-Encoding': 'gzip,deflate'
        }
    };

  fetch('https://leoym.github.io/ident.json', options)
  //fetch('https://recs.chaordicsystems.com/v0/events/recommendations?source=app&complete=true&deviceId=dr9gboG4aCg&productId=B78-3351-026&name=product&campaign=netpro_fcbkads&apiKey=netshoes-br&secretKey=1yKEygGFUmQf4%2BRCe6FZ%2Bg%3D%3D&productFormat=compact', options)
    .then(res => res.text())
    .then(body => {
    //i//console.log(body);
    //console.log(body);
    //console.log(body);
    //console.log(body);
    //console.log(body);
    res.send(body);
  }).catch((error) => {
    res.send(error);
    //logger.error(error.message, error);
    //res.status(error.response.status).send(error.response.data);
  });
});

router.get('/teste1', (req, res) => {

   const agent = new http.Agent({
        keepAlive: true,
        keepAliveMsecs: 10000000
    });

    const options = {
        host: 'objecthub.io',
        port: 443,
        path: '/admin/metrics/main.json',
        method: 'GET',
        agent: agent
    };

  var req = https.request(options, function(res) {

    var str = "";
    res.on('data', function (chunk) {
       str += chunk;
    });

    res.on('end', function () {
       // done
    });
    console.log(str);
  });

  req.write('');
  req.end();

  req.on('error', function(e) {
   // error
  });

  res.send( "OK");

});

router.get('/teste2', (req, res) => {

  var request = require('request');
  request('https://recs.chaordicsystems.com/v0/events/recommendations?source=app&complete=true&deviceId=dr9gboG4aCg&productId=B78-3351-026&name=product&campaign=netpro_fcbkads&apiKey=netshoes-br&secretKey=1yKEygGFUmQf4%2BRCe6FZ%2Bg%3D%3D&productFormat=compact', function (error, response, body) {
  console.log("OK");
  res.send( "OK");
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
  });

});

router.get('/teste3', (req, res) => {
 
   const agent = new http.Agent({
        keepAlive: true,
        keepAliveMsecs: 10000000
    });

    const options = {
        host: 'objecthub.io',
        port: 443,
        path: '/admin/metrics/main.json',
        method: 'GET',
        agent: agent
    }; 

  https.request(options, function(resp) {

    var str = "";
    resp.on('data', function (chunk) {
       str += chunk;
    });

    resp.on('end', function () {
       // done
       res.send("OK");
    });
    console.log("str");
  });

 res.send("OK");
});

router.get('/file', (req, res) => {
  fs.readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
     res.end();
  });
});

router.get('/file1', (req, res) => {
  fs.readFile('demofile1.html', function(err, data) {
   
  var fs1 = require('fs');

  //const random = require('random')
  //arq = random.int(); 

  var rn = require('random-number');
  var options = {
    min: 0
    , max: 1000000
    , integer: true
  }

  var arq = rn(options);

    fs1.writeFile( arq + '-mynewfile3.txt', 'Hello content!', function (err) {
      if (err) throw err;
         console.log('Saved!');
    });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

function GetSite() {
    var resposta = 'X';
    fetch('http://localhost:3000/reports/xyz')
    .then(res => res.text())
    //.then(body => console.log(body));
    //.then(body => res.send(body));
    .then(body => resposta = body);

    return resposta;
}

router.get('/stress', (req, res) => {

const https = require('https');

var agent = new https.Agent({
    keepAlive: true
});

const options = {
  agent,
  hostname: 'recs.chaordicsystems.com',
  port: 443,
  path: '/v0/events/recommendations?source=app&complete=true&deviceId=dr9gboG4aCg&productId=B78-3351-026&name=product&campaign=netpro_fcbkads&apiKey=netshoes-br&secretKey=1yKEygGFUmQf4%2BRCe6FZ%2Bg%3D%3D&productFormat=compact',
  method: 'GET'
};

const reqC = https.request(options, (resC) => {
  var start = new Date().getTime();
  var ret = "";
  //console.log('statusCode:', res.statusCode);
  //console.log('headers:', res.headers);
  resC.on('data', (d) => {
    //process.stdout.write(d);
    ret = ret + d;
    console.log('Completed after '+(new Date().getTime() - start));
  });
  res.send(ret);
});

reqC.on('error', (e) => {
  console.error(e);
});
reqC.end();

//res.send('OK');
});

module.exports = router;
