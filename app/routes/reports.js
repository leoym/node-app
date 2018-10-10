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

router.get('/teste', (req, res) => {
 
   const agent = new http.Agent({
        keepAlive: true,
        keepAliveMsecs: 10000000
    });

    const options = {
        agent,
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

module.exports = router;
